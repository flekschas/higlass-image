# HiGlass Image

> A collection of tracks for viewing image data in HiGlass

[![HiGlass](https://img.shields.io/badge/higlass-👍-red.svg?colorB=000000)](http://higlass.io)
[![Demo](https://img.shields.io/badge/demo-🙈-red.svg?colorB=000000)](http://higlass-image.lekschas.de/)
[![Build Status](https://img.shields.io/travis/flekschas/higlass-image/master.svg?colorB=000000)](https://travis-ci.org/flekschas/higlass-image)

![HiGlass showing](/teaser.jpg?raw=true "Rio de Janeiro by Rio HK")

HiGlass in dark mode showing a beautiful gigapixel image of [Rio de Janeiro](http://www.gigapan.com/gigapans/66020) by [The Rio de Janeiro - Hong Kong Connection](https://www.visgraf.impa.br/riohk/)

**Live Demo:** [http://higlass-image.lekschas.de](http://higlass-image.lekschas.de)

**Note**: This is the source code for image tracks only! You might want to check out the following repositories as well:

- **Image tiles to SQLite converter:** https://github.com/flekschas/image-tiles-to-sqlite
- HiGlass viewer: https://github.com/hms-dbmi/higlass
- HiGlass server: https://github.com/hms-dbmi/higlass-server
- HiGlass docker: https://github.com/hms-dbmi/higlass-docker

## Installation

```
npm install higlass-image
```

## Usage

_Note:_ We assume that you have create and ingested a SQLite-based image tileset database. If you're asking yourself "what the fu\*! are they talking about" please check out our [image tiles to SQLite converter](https://github.com/flekschas/image-tiles-to-sqlite).

1. Make sure you load this track prior to `hglib.js`. For example:

```
<script src="higlass-image.js"></script>
<script src="hglib.js"></script>
<script>
  ...
</script>
```

2. Configure the track in the view config.

```
{
  ...
  center: [
    {
      uid: 'c1',
      type: 'combined',
      options: {},
      contents: [
        {
          uid: 'my-fancy-tiled-image',
          type: 'image-tiles',
          server: 'http://localhost:8001/api/v1/',
          tilesetUid: 'my-fancy-tiled-image',
          options: {
            name: 'My fancy tiled image'
          }
        },
      ],
    },
  ],
  ...
}
```

Take a look at [`src/index.html`](src/index.html) for an example.

3. You did it! We're so proud of you 🎉. You are truly the best!

## Development

### Installation

```bash
$ git clone https://github.com/flekschas/higlass-image && higlass-image
$ npm install
```

### Commands

**Developmental server**: `npm start`
**Production build**: `npm run build`
