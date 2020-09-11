# Tagging Strategy

A github action for easily producing a matrix of docker image tags based
using semver, and other common docker tagging strategies as inputs.

- [Tagging Strategy](#tagging-strategy)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
    - [Strategies](#strategies)
      - [Pattern](#pattern)
      - [Prerelease](#prerelease)
      - [Variant](#variant)
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

### Strategies

The forumula for the output tag is: `pattern`+`<prerelease>`+`<variant>`

#### Pattern

A strategy is comprised of a valid or coercable semver pattern, 
using `X`, `Y`, and `Z`, as well as the word `latest`.

Valid pattern examples include:

```
latest
latest*
%X%
%Z%
%X.Y.Z%
%X.Y%
```

These can be in any order, but only `X`, `Y`, and `Z` will be parsed at this time.

`latest` - returns `latest`
`X` - returns Major version
`Y` - returns Minor version
`Z` - returns Patch version


#### Prerelease

A `prerelease` is parsed from the `tag_name` from your release event. This string
will match anything that follows the identified version number from the tag.

For example when created a release tag in github using the examples below,
the highlighted sections indicate what would be returned as the `prerelease` value.

1.0.0`-beta1`
1.0.0`-rc.1`
1.0.0`-build-3467821`

#### Variant


The `variant` is any modifier you want to add to the tag. This can be used
to produce a matrix of tags that have the same version, but multiple variants.

Common uses are to use `variant` to define features or operating systems for each tag.

Examples of using a variant:

```
%X%-ubuntu => given 1.0.0 returns 1-ubuntu
%X.Y.Z%-ubuntu => given 1.0.0-rc.1 returns 1.0.0-rc1-ubuntu
```

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
    types: [prereleased, released]

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
        image-tagging-strategy: ['latest', 'latest-foobar', %X%-foobar', '%X.Y%-foobar', '%X.Y.Z%-foobar']

    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: tagging
        id: tagging
        uses: HackerHappyHour/tagging-strategy@v1
        with:
          pattern: "${{ matrix.image-tagging-strategy }}"
          tag_name: "${{ github.event.client_payload.tag_name }}"
      - name: Use Tag
        run: echo ${{ steps.tagging.outputs.tag }}

```

[release]: https://docs.github.com/en/actions/reference/events-that-trigger-workflows#release
