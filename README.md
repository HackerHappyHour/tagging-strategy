# Tagging Strategy

A github image for easily producing a matrix of docker image tags based
using semver, and other common docker tagging strategies as inputs.

- [Tagging Strategy](#tagging-strategy)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
  - [Examples](#examples)
    - [From Release on repo](#from-release-on-repo)
    - [From Release on External Repository](#from-release-on-external-repository)

## Inputs

| Name             | Type    | Required   | Description                        |
|------------------|---------|------------|------------------------------------|
| `pattern`        | [Strategy](#strategies) | yes | The strategy to parse the tag paylod with |
| `tag_name` | String | yes | A `tag_name` from a github [release][] event |


## Outputs

| Name             | Type    | Description |
|------------------|---------|-------------|
| `tag` | `String` | The transformed tag |

## Examples

### From Release on repo 
```yaml
jobs:
  myReleaseExample:
    runs-on: ubuntu-latest
    stategy:
      matrix:
        image-tagging-strategy: ['%X%-foobar', '%X.Y%-foobar', '%X.Y.Z%-foobar']

    steps:
    # checkout steps etc...
    # Image Tagger
    - name: Image Tag Strategy
      id: tagging
      uses: HackerHappyHour/tagging-strategy@v1
      if: ${{ github.event_name == 'release' }}
      with:
        pattern: ${{ matrix.image-tagging-strategy }}
        tag_name: ${{ github.ref }}
    - name: Setup Buildx
      id: setup
      uses: crazy-max/ghaction-docker-buildx@v3

    - name: Build
      run: |
        docker buildx build -t ${{ github.repo }}:${{ steps.tagging.outputs.tag }} .
  
```

### From Release on External Repository 

Setup a `repository_dispatch` job on the external repository:

```yaml
name: Dispatcher

on:
  release:
    types: [published, prereleased, released]

jobs:

  dispatch:
    runs-on: ubuntu-latest

    steps:
      - name: dispatch
        id: dispatch
        uses: peter-evans/repository-dispatch@v1
        with:
          token: ${{ secrets.OCTOPRINT_DOCKER_DISPATCH_TOKEN }}
          repository: HackerHappyHour/tagging-strategy
          event-type: 'release'
          client-payload: '{"tag_name": "${{ github.event.release.tag_name }}"}'

```

Then set up your job in your repo performing the tagging:

```yaml
name: Release Dispatch

on:
  repository_dispatch:
    types: [release]

jobs:
  debug:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        image-tagging-strategy: ['%X%-foobar', '%X.Y%-foobar', '%X.Y.Z%-foobar']

    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: tagging
        id: tagging
        uses: ./
        with:
          pattern: "${{ matrix.image-tagging-strategy }}"
          tag_name: "${{ github.event.client_payload.tag_name }}"
      - name: Use Tag
        run: echo ${{ steps.tagging.outputs.tag }}

```

[release]: https://docs.github.com/en/actions/reference/events-that-trigger-workflows#release
