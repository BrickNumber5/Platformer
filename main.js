const cnv = document.querySelector( ".main canvas" );
const ctx = cnv.getContext( "2d" );
let width, height;

const scale = 3;

console.log( cnv );

function onResize( ) {
  cnv.width = width = innerWidth;
  cnv.height = height = innerHeight;
}
window.addEventListener( "resize", onResize );
onResize( );

let previousTimeStamp;
function draw( timeStamp ) {
  if ( !previousTimeStamp ) {
    previousTimeStamp = timeStamp;
    requestAnimationFrame( draw );
    return;
  }
  const elapsedTime = timeStamp - previousTimeStamp;
  previousTimeStamp = timeStamp;
  requestAnimationFrame( draw );
}
draw( );