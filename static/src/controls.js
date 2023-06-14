
const pi = Math.PI;
const tau = 2*Math.PI;
const piOver2 = Math.PI/2;
const apiOver2 = .95*Math.PI/2;
var cameraRadius = 10;
var isCliking = false;
const pointer = new THREE.Vector2();
const cameraAngels = {'refx':0,'refy':0,'dx':0,'dy':0};
cameraAngels.dy = pi/6;
const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = .03;
const pointerXYZ = {'x':0,'y':0,'z':0};
function onMouseDown( event ) {
    cameraAngels.refx = ( event.clientX / window.innerWidth ) * 2 - 1;
    cameraAngels.refy = -( event.clientY / window.innerHeight ) * 2 + 1;
    isCliking = true;
    if (isHovering && applyenergy && !init){
        console.log(applyenergy)
    const xp = pointerXYZ.x;
    const zp = pointerXYZ.z;
    for ( let i = 0; i < N_1; i ++ )
    {
      const v_row = [];
      for ( let j = 0; j < N_1; j ++ )
      {
        const _x = geomXYZ[i*3*N_1+j*3];
        const _y = geomXYZ[i*3*N_1+j*3+2];
         v_row[j] = 5*Math.exp(-500*(Math.pow(_x-xp,2))-500*(Math.pow(_y-zp,2))) + .5*(u_np1[i][j]-u_nm1[i][j])/dt;
//        v_row[j] = 2.5*Math.exp(-500*(Math.pow(_x-xp,2))-500*(Math.pow(_y-zp,2))) + .5*(u_np1[i][j]-u_nm1[i][j])/dt;
        // v_row[j] = 1.5*Math.exp(-100*Math.pow((_x-xp),2)-100*Math.pow((_y-zp),2)) + .5*(u_np1[i][j]-u_nm1[i][j])/dt;
      }
      V[i]=v_row;
    }
    starter();
    applyBoundTypeInit();
    setA2B(u_nm1,u_n);
    setA2B(u_n,u_np1);
    }
};
document.addEventListener( 'mousedown', onMouseDown );
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};
window.addEventListener( 'resize', onWindowResize );
function onMouseMove( event ) {
    const mouseMoveX = ( event.clientX / window.innerWidth ) * 2 - 1;
    const mouseMoveY = -( event.clientY / window.innerHeight ) * 2 + 1;
    pointer.x = mouseMoveX;
    pointer.y = mouseMoveY;
    if (isCliking){
        cameraAngels.dx -= (cameraAngels.refx - mouseMoveX)/25;
        const dystep = (cameraAngels.refy - mouseMoveY)/25;
        if (Math.abs(cameraAngels.dy)<apiOver2)
        {cameraAngels.dy += dystep;}
        else{if (Math.abs(cameraAngels.dy + dystep) < Math.abs(cameraAngels.dy))
        {cameraAngels.dy += dystep;};
        };
    };
};
document.addEventListener( 'mousemove', onMouseMove );
function onMouseUp( event ) {if (isCliking){isCliking = false;}};
document.addEventListener('mouseup', onMouseUp);
function onMouseWheel( event ) {
    event.preventDefault();
    if (cameraRadius < 500)
    {cameraRadius += Math.pow(cameraRadius,1.5)*event.deltaY/(5000);}
    else{if(event.deltaY<0)
    {cameraRadius += Math.pow(cameraRadius,1.5)*event.deltaY/(5000);}}
};
document.addEventListener('mousewheel', onMouseWheel,{passive: false});
function updateCamera(argument) {
    camera.position.z = cameraRadius*Math.cos(cameraAngels.dx)*Math.cos(cameraAngels.dy);
    camera.position.x = -cameraRadius*Math.sin(cameraAngels.dx)*Math.cos(cameraAngels.dy);
    camera.position.y = cameraRadius*Math.sin(cameraAngels.dy);
    camera.lookAt(0,0,0);
};