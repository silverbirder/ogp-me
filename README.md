[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/Silver-birder/ogp-me)

# \<ogp-me>

`<ogp-me>` is a WebComponent that displays Facebook-like information based on Open Graph Protocol (OGP).

We referred to [Share Debugger - Facebook for Developers](https://developers.facebook.com/tools/debug).

## OGP

> The Open Graph protocol enables any web page to become a rich object in a social graph. For instance, this is used on Facebook to allow any web page to have the same functionality as any other object on Facebook.

※ https://ogp.me/

## Usage

```html
<script type="module">
  import { OgpMe } from "https://cdn.skypack.dev/@silverbirder/ogp-me";
  window.customElements.define("ogp-me", OgpMe);
</script>

<ogp-me
  proxy="https://silverbirder-cors-anywhere.herokuapp.com"
  src="https://github.com/facebookarchive/open-graph-protocol"
  width="512px"
></ogp-me>
```

![sample_ogp_me](https://res.cloudinary.com/silverbirder/image/upload/h_512/v1649512034/github.com/ogp-me/sample_ogp_me.png)

### Attributes

| Attribute | Type     | Required | Default | Description                                             |
| --------- | -------- | -------- | ------- | ------------------------------------------------------- |
| src       | _String_ | true     | `""`    | URL to display                                          |
| proxy     | _String_ | true     | `""`    | URL of proxy.</br>The details is [here(Proxy)](#Proxy). |
| weight    | _String_ | false    | `""`    | weight                                                  |

### Proxy

> Some of provider is not allow cross-origin HTTP request and oembed will not work with those site. You need to put proxy url to make it work. I would suggest to use cors-anywhere.herokuapp.com as your proxy. Self hosted version is provide at https://github.com/Rob--W/cors-anywhere/.

※ https://www.webcomponents.org/element/thangman22/oembed-component

## Installation

```bash
npm i @silverbirder/ogp-me
```
