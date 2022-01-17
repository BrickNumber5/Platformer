const cnv = document.querySelector( ".main canvas" );
const ctx = cnv.getContext( "2d" );
let width, height;

const scale = 50;

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
  player.draw( timeStamp );
  
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
  computeAngles: ( ) => ( {
    main: 0,
    head: 0,
    back_leg: [ 0, 0 ],
    front_leg: [ 0, 0 ],
    back_arm: [ 0, 0 ],
    front_arm: [ 0, 0 ]
  } ),
  draw: ( animationFrame ) => {
    ctx.strokeStyle = "#ccc";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = camera.calculateScale( ) / 3;
    
    const angles = player.computeAngles( );
    
    const shoulders = {
      x: player.x + 0.5 * Math.cos( angles.main - Math.PI / 2 ),
      y: player.y + 0.5 * Math.sin( angles.main - Math.PI / 2 )
    };
    const head = {
      x: shoulders.x + 0.5 * Math.cos( angles.main + angles.head - Math.PI / 2 ),
      y: shoulders.y + 0.5 * Math.sin( angles.main + angles.head - Math.PI / 2 )
    };
    const hips = {
      x: player.x + Math.cos( angles.main + Math.PI / 2 ),
      y: player.y + Math.sin( angles.main + Math.PI / 2 )
    };
    
    // Body
    ctx.beginPath( );
    ctx.moveTo( ...camera.transform( head.x, head.y ) );
    ctx.lineTo( ...camera.transform( shoulders.x, shoulders.y ) );
    ctx.lineTo( ...camera.transform( hips.x, hips.y ) );
    ctx.stroke( );
    
    // Back Leg
    const back_knee = {
      x: hips.x + Math.cos( angles.main + angles.back_leg[ 0 ] + Math.PI / 2 ),
      y: hips.y + Math.sin( angles.main + angles.back_leg[ 0 ] + Math.PI / 2 )
    };
    const back_foot = {
      x: back_knee.x + Math.cos( angles.main + angles.back_leg[ 0 ] + angles.back_leg[ 1 ] + Math.PI / 2 ),
      y: back_knee.y + Math.sin( angles.main + angles.back_leg[ 0 ] + angles.back_leg[ 1 ] + Math.PI / 2 )
    };
    ctx.beginPath( );
    ctx.moveTo( ...camera.transform( hips.x, hips.y ) );
    ctx.lineTo( ...camera.transform( back_knee.x, back_knee.y ) );
    ctx.lineTo( ...camera.transform( back_foot.x, back_foot.y ) );
    ctx.stroke( );
    
    // Front Leg
    const front_knee = {
      x: hips.x + Math.cos( angles.main + angles.front_leg[ 0 ] + Math.PI / 2 ),
      y: hips.y + Math.sin( angles.main + angles.front_leg[ 0 ] + Math.PI / 2 )
    };
    const front_foot = {
      x: front_knee.x + Math.cos( angles.main + angles.front_leg[ 0 ] + angles.front_leg[ 1 ] + Math.PI / 2 ),
      y: front_knee.y + Math.sin( angles.main + angles.front_leg[ 0 ] + angles.front_leg[ 1 ] + Math.PI / 2 )
    };
    ctx.beginPath( );
    ctx.moveTo( ...camera.transform( hips.x, hips.y ) );
    ctx.lineTo( ...camera.transform( front_knee.x, front_knee.y ) );
    ctx.lineTo( ...camera.transform( front_foot.x, front_foot.y ) );
    ctx.stroke( );
    
    // Back Arm
    const back_elbow = {
      x: shoulders.x + Math.cos( angles.main + angles.back_arm[ 0 ] + Math.PI / 2 ),
      y: shoulders.y + Math.sin( angles.main + angles.back_arm[ 0 ] + Math.PI / 2 )
    };
    const back_hand = {
      x: back_elbow.x + Math.cos( angles.main + angles.back_arm[ 0 ] + angles.back_arm[ 1 ] + Math.PI / 2 ),
      y: back_elbow.y + Math.sin( angles.main + angles.back_arm[ 0 ] + angles.back_arm[ 1 ] + Math.PI / 2 )
    };
    ctx.beginPath( );
    ctx.moveTo( ...camera.transform( shoulders.x, shoulders.y ) );
    ctx.lineTo( ...camera.transform( back_elbow.x, back_elbow.y ) );
    ctx.lineTo( ...camera.transform( back_hand.x, back_hand.y ) );
    ctx.stroke( );
    
    // Front Arm
    const front_elbow = {
      x: shoulders.x + Math.cos( angles.main + angles.front_arm[ 0 ] + Math.PI / 2 ),
      y: shoulders.y + Math.sin( angles.main + angles.front_arm[ 0 ] + Math.PI / 2 )
    };
    const front_hand = {
      x: front_elbow.x + Math.cos( angles.main + angles.front_arm[ 0 ] + angles.front_arm[ 1 ] + Math.PI / 2 ),
      y: front_elbow.y + Math.sin( angles.main + angles.front_arm[ 0 ] + angles.front_arm[ 1 ] + Math.PI / 2 )
    };
    ctx.beginPath( );
    ctx.moveTo( ...camera.transform( shoulders.x, shoulders.y ) );
    ctx.lineTo( ...camera.transform( front_elbow.x, front_elbow.y ) );
    ctx.lineTo( ...camera.transform( front_hand.x, front_hand.y ) );
    ctx.stroke( );
    
    ctx.lineWidth *= 3;
    
    // Head
    ctx.beginPath( );
    ctx.moveTo( ...camera.transform( head.x, head.y ) );
    ctx.lineTo( ...camera.transform( head.x, head.y ) );
    ctx.stroke( );
  }
}