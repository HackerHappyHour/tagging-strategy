# Tagging Strategy

A github image for easily producing a matrix of docker image tags based
using semver, and other common docker tagging strategies as inputs.

- [Tagging Strategy](#tagging-strategy)
  - [Usage](#usage)
    - [Inputs](#inputs)
    - [Outputs](#outputs)
    - [Examples](#examples)
    - [From Release on repo](#from-release-on-repo)
    - [From Release on External Repository](#from-release-on-external-repository)

## Usage

### Inputs

| Name             | Type    | Required   | Description                        |
|------------------|---------|------------|------------------------------------|
| `pattern`        | [Strategy](#strategies) | yes | The strategy to parse the tag paylod with |
| `tag_name` | String | yes | A `tag_name` from a github [release][] event |


### Outputs

| Name             | Type    | Description |
|------------------|---------|-------------|
| `tag` | `String` | The transformed tag |

### Examples

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

See [HackerHappyHour/test-repo-dispatcher/.github/workflows/dispatches.yml][dispatch_example] for an example on how to send from another repo, and [.github/workflows/release_dispatch.yml](/.github/workflows/release_dispatch.yml) to see how to receive from that event.

[dispatch_example]: https://github.com/HackerHappyHour/test-repo-dispatcher/blob/master/.github/workflows/dispatches.yml 
[release]: https://docs.github.com/en/actions/reference/events-that-trigger-workflows#release
