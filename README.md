# Tagging Strategy

A github image for easily producing a matrix of docker image tags based
using semver, and other common docker tagging strategies as inputs.

- [Tagging Strategy](#tagging-strategy)
  - [Usage](#usage)
    - [Inputs](#inputs)
    - [Outputs](#outputs)

## Usage

```yaml
jobs:
  docker_image:
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

### Inputs

| Name             | Type    | Required   | Description                        |
|------------------|---------|------------|------------------------------------|
| `pattern`        | [Strategy](#strategies) | yes | The strategy to parse the tag paylod with |
| `tag_name` | String | yes | A `tag_name` from a github [release][] event |
see [HackerHappyHour/test-repo-dispatcher/.github/workflows/dispatches.yml][dispatch_example] for an example on how to send from another repo |

### Outputs

| Name             | Type    | Description |
|------------------|---------|-------------|
| `tag` | `String` | The transformed tag |

[dispatch_example]: https://github.com/HackerHappyHour/test-repo-dispatcher/blob/master/.github/workflows/dispatches.yml 
[release]: https://docs.github.com/en/actions/reference/events-that-trigger-workflows#release
