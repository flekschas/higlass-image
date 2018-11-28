import register from 'higlass-register';

import TiledImageTrack from './TiledImageTrack';

register({
  name: 'TiledImageTrack',
  track: TiledImageTrack,
  config: TiledImageTrack.config
});

export default TiledImageTrack;
