# Image Tagger 

A github image for easily producing a matrix of docker image tags based
using semver, and other common docker tagging strategies as inputs.

- [Image Tagger](#image-tagger)
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
        image-tagger-patterns: ['latest', 'X', 'X.Y', 'X.Y.Z']

    steps:
    # checkout steps etc...

    # Image Tagger
    - name: Image Tag Strategy
      id: tag-strategy
      uses: HackerHappyHour/image-tagger@v1
      with:
        pattern: ${{ matrix.image-tagger-patterns }}
    - name: Build Image
      id: build
      run: |
        docker build -t ${{ github.repo }}:${{ steps.tag-strategy.output.tag }} .
```

### Inputs


### Outputs
