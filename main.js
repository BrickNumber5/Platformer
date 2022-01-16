const cnv = document.querySelector( ".main canvas" );
const ctx = cnv.getContext( "2d" );
let width, height;

const scale = 5;

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
  
  ctx.clearRect( 0, 0, width, height );
  player.draw( ( timeStamp % 10000 ) / 10000 );
  
  requestAnimationFrame( draw );
}
draw( );

const camera = {
  x: 0,
  y: 0,
  scale: 1,
  calculateScale: ( ) => scale * camera.scale,
  transform: ( x, y ) => [
    ( camera.x + x ) * camera.calculateScale( ) + ( width  / 2 ),
    ( camera.y + y ) * camera.calculateScale( ) + ( height / 2 )
  ]
}

const player = {
  x: 0,
  y: 0,
  draw: ( animationFrame ) => {
    ctx.strokeStyle = "#ccc";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2 * camera.calculateScale( );
    
    // Body
    ctx.beginPath( );
    ctx.moveTo( ...camera.transform( player.x, player.y + 5 ) );
    ctx.lineTo( ...camera.transform( player.x, player.y - 5 ) );
    ctx.stroke( );
    
    player.drawLeg( animationFrame );
    player.drawLeg( ( animationFrame + 0.25 ) % 1 );
    
    // Head
    ctx.lineWidth *= 2;
    ctx.beginPath( );
    ctx.moveTo( ...camera.transform( player.x, player.y - 5 ) );
    ctx.lineTo( ...camera.transform( player.x, player.y - 5 ) );
    ctx.stroke( );
  },
  drawLeg( animationFrame ) {
    const root = { x: player.x, y: player.y + 5 };
    
    const a = -( Math.sin( 4 * Math.PI * animationFrame ) - (3/2) ) / 6;
    const b = a - ( Math.sin( 2 * Math.PI * animationFrame ) - 1 ) / 8;
    
    const knee = {
      x: root.x + 5 * Math.cos( 2 * Math.PI * a ),
      y: root.y + 5 * Math.sin( 2 * Math.PI * a )
    };
    
    const foot = {
      x: knee.x + 5 * Math.cos( 2 * Math.PI * b ),
      y: knee.y + 5 * Math.sin( 2 * Math.PI * b )
    };
    
    ctx.beginPath( );
    ctx.moveTo( ...camera.transform( root.x, root.y ) );
    ctx.lineTo( ...camera.transform( knee.x, knee.y ) );
    ctx.lineTo( ...camera.transform( foot.x, foot.y ) );
    ctx.stroke( );
  }
}