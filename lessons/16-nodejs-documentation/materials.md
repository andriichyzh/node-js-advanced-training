# Documentation

## Readme Driven Development (README.md)

### Emphasis

  - Write README first
  - Try describe project
  - Don't do any feature until you have describe it
  
### Benefits

  - Usually it is first main page of project
  - Simple markup (code + docs)
  - Fast and easy
  - Versioned
  - Synchronized with project
  
### Structure

  - Name of project
  - Description
  - How to use it? Examples.
  - API (with params description)
  - Configurations
  - Instructions to install and run
  - List of authors
  - Licence
  - Instructions to submit bugs

### Links:

  -  Tom Preston-Werner - Readme Driven Developmenthttp://tom.preston-werner.com/2010/08/23/readme-driven-development.html

## Changelog (CHANGELOG.md)

```md
# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- zh-CN and zh-TW translations from @tianshuo.
- de translation from @mpbzh.

## [0.3.0] - 2015-12-03
### Added
- RU translation from @aishek.
- pt-BR translation from @tallesl.
- es-ES translation from @ZeliosAriex.

## [0.2.0] - 2015-10-06
### Changed
- Remove exclusionary mentions of "open source" since this project can benefit
both "open" and "closed" source projects equally.

## [0.1.0] - 2015-10-06
### Added
- Answer "Should you ever rewrite a change log?".

### Changed
- Improve argument against commit logs.
- Start following [SemVer](http://semver.org) properly.
```

### A good change log sticks to these principles:

  - It’s made for humans, not machines, so legibility is crucial.
  - Easy to link to any section (hence Markdown over plain text).
  - One sub-section per version.
  - List releases in reverse-chronological order (newest on top).
  - Write all dates in YYYY-MM-DD format. (Example: 2012-06-02 for June 2nd, 2012.) It’s international, sensible, and language-independent.
  - Explicitly mention whether the project follows Semantic Versioning.
  - Each version should:
     - List its release date in the above format.
     - Group changes to describe their impact on the project, as follows:
        - `Added` for new features.
        - `Changed` for changes in existing functionality.
        - `Deprecated` for once-stable features removed in upcoming releases.
        - `Removed` for deprecated features removed in this release.
        - `Fixed` for any bug fixes.
        - `Security` to invite users to upgrade in case of vulnerabilities.


### Links:

  - Keep a CHANGELOG http://keepachangelog.com/


## License (LICENSE.md)

### Links:

  - Featured licenses http://choosealicense.com/licenses/
  - Choose an open source license http://choosealicense.com/


## Contributing (CONTRIBUTING.md)

It explains how a participant should do things like format code, test fixes, and submit patches. 
From a maintainer's point of view, the document succinctly communicates how best to collaborate. 
And for a contributor, one quick check of this file verifies their submission follows the maintainer's guidelines.

### Links

  - Example Atom https://github.com/atom/atom/blob/master/CONTRIBUTING.md
  - Example Ruby on Rails https://github.com/rails/rails/blob/master/CONTRIBUTING.md 


## Formats common

### Markdown

Markdown is a better way to write HTML, without all the complexities and ugliness that usually accompanies it.

Some of the key benefits are:

  - Markdown is simple to learn, with minimal extra characters so it's also quicker to write content.
  - Less chance of errors when writing in markdown.
  - Produces valid XHTML output.
  - Keeps the content and the visual display separate, so you cannot mess up the look of your site.
  - Write in any text editor or Markdown application you like.
  - Markdown is a joy to use!


#### Links:

  - John Gruber's original spec http://daringfireball.net/projects/markdown/
  - Github-flavored Markdown info page https://help.github.com/categories/writing-on-github/
  - Markdown Syntax http://learn.getgrav.org/content/markdown

## Formats API description

### Swagger

#### Links: 
 
  - Specification http://swagger.io/specification/
  - Online Editor http://editor.swagger.io/#/


### RAML

#### Links

  - Specification https://github.com/raml-org/raml-spec/blob/raml-10/versions/raml-10/raml-10.md
  - Examples https://github.com/raml-apis
  - Online Editor https://www.mulesoft.com/platform/api/api-designer


### API Blueprint

#### Links: 
 
  - Specification https://apiblueprint.org/documentation/specification.html
  - Examples https://github.com/apiaryio/api-blueprint/tree/master/examples


### Pros and Cons

#### Swagger

  - **Pros:** Heavily adopted, large community of users and supporters, greater support for multiple languages
  - **Cons:** Lacks advanced constructs for metadata

#### RAML

  - **Pros:** Supports advanced constructs, decent adoption, human readable format, high industry backing
  - **Cons:** Lacks code-level tooling, still unproven long-term

#### API Blueprint

  - **Pros:** Easy to understand, simple to write
  - **Cons:** Low adoption, lacks advanced constructs in general, complex installation
