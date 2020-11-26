# Tagging Strategy

A github action for easily creating a strategy for a whole bunch of tags, and generating all those tags given
a single raw semver compatible tag.

Best used for creating docker tags, but creates a comma separated list of strings for whatever uses you may have.

**Note:** This project has a lot of overlap with [crazy-max/ghaction-docker-meta](), and may eventually be sunset
entirely in favor of that action.  I highly encourage you to check that action out as well.

That action has much more support for docker specific build manipulation, and may be better for your needs.

Currently the things _this_ project has that ghaction-docker-meta doesn't support (yet) are:
- tag suffixes/variants (support pending via [PR #15](https://github.com/crazy-max/ghaction-docker-meta/pull/15))
- explicit `latest` control (see discussion/track via [crazy-max/ghaction-docker-meta/issues/19](https://github.com/crazy-max/ghaction-docker-meta/issues/19) )
- completely event agnostic 

I am working with the author and collaborators of that project to add several of those features, and may eventually archive
this action once those features are available

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
| `latest`        | `Boolean` | yes (default `false`)| The strategies to parse the tag paylod with |
| `tags`        | [csv/list of strategies](#strategy-parsing) | yes | The strategies to parse the tag paylod with |
| `tag_name` | `String` | yes (default is `X.Y.Z`) | A semver parseable string |


## Outputs

| Name             | Type    | Description |
|------------------|---------|-------------|
| `tags` | csv string | The transformed tags |

## Usage

This project was inspired by the need to create multiple tags for a single docker image. While it can work with any
tagging needs for any software. 

It is especially well geared towards being used with the [Docker Build and Push][docker-build-and-push] github action.
The format of the `tags` output is natively compatible with the `tags` input of the build-and-push action.

```yaml
steps:
  -
    id: tagging-strategy
    uses: HackerHappyHour/tagging-strategy@v2
    with:
      latest: true
      tags: '%X%, %X%-debian, %X.Y%, %X.Y%-debian'
      tag_name: '1.0.0'

  - 
    uses: docker/setup-buildx-action@v1
  -
    uses: docker/build-push-action@v2
    with:
      tags: ${{ steps.tagging-strategy.outputs.tags }}
      platforms: linux/amd64,linux/arm64,linux/arm/v7
```

The example above would result in a multi-platform image where the digests for each platform match across all the tags.

<details><summary>Example output.</summary>
<p>Notice how the digests for `linux/amd64` match for each tag (likewise for each arch<p>

```
Tag
===
latest

Digest                    OS/ARCH
======                    =======
57f8a1d499bb              linux/amd64
7fbe9ad1fbc6              linux/arm/v7
ff87a758e329              linux/arm64

Tag
===
1

Digest                    OS/ARCH
======                    =======
57f8a1d499bb              linux/amd64
7fbe9ad1fbc6              linux/arm/v7
ff87a758e329              linux/arm64


Tag
===
1-debian

Digest                    OS/ARCH
======                    =======
57f8a1d499bb              linux/amd64
7fbe9ad1fbc6              linux/arm/v7
ff87a758e329              linux/arm64

Tag
===
1.0

Digest                    OS/ARCH
======                    =======
57f8a1d499bb              linux/amd64
7fbe9ad1fbc6              linux/arm/v7
ff87a758e329              linux/arm64

Tag
===
1.0-debian

Digest                    OS/ARCH
======                    =======
57f8a1d499bb              linux/amd64
7fbe9ad1fbc6              linux/arm/v7
ff87a758e329              linux/arm64
```
</p>
</details>

### Strategy Parsing

The forumula for each individual entry of the `tags` input: `pattern`+`<prerelease>`+`<variant>`

#### Pattern

A strategy is comprised of a valid or coercable semver pattern, 
using `X`, `Y`, and `Z`, as well as the word `latest`.

Valid pattern examples include:

```
%X%
%Z%
%X.Y.Z%
%X.Y%
%X%-foobar 
%X.Y.Z%-foobar-baz
```

Sections of the pattern are denoted using `%`. Currently only `X`, `Y`, and `Z` will be translated.

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

    steps:
    # checkout steps etc...
    # Image Tagger
    - name: Image Tag Strategy
      id: tagging
      uses: HackerHappyHour/tagging-strategy@v1
      if: ${{ github.event_name == 'release' }}
      with:
        latest: true
        tags: |
          %X%-foobar
          %X.Y%-foobar
          %X.Y.Z%-foobar
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

    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Produce Docker Tags
        id: tagging
        uses: HackerHappyHour/tagging-strategy@v1
        with:
          latest: github.event_type
          tags: |
            %X%-foobar
            %X.Y%-foobar
            %X.Y.Z%-foobar
          tag_name: ${{ github.event.client_payload.tag_name }}
      - name: Use Tag
        run: echo ${{ steps.tagging.outputs.tags }}

```

### Conditionally produce 'latest'

You can conditionally produce a `latest` tag by using an expression that evaluates to a `boolean`.

Let's say you have a job that can run on `push` and `pull_request`  events on the `master` branch, but you only want to output `latest` when
the event is a push:

```yaml
steps:
  id: tags
  uses: HackerHappyHour/tagging-strategy@v2
  with:
    latest: ${{ github.event_name  == 'push'}}
```

[docker-build-and-push]: https://github.com/docker/build-push-action
[release]: https://docs.github.com/en/actions/reference/events-that-trigger-workflows#release
