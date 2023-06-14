const widthX = 5;
const widthZ = 5;
const res = 200;
const dx = widthX/res;
const dt = .1*dx;
const Cx2 = (dt/dx)*(dt/dx);
const Cy2 = (dt/dx)*(dt/dx);

const N_1 = res+1;
const u_n = [];
const u_nm1 = [];
const q = [];
const u_np1 = [];
// const xx = [];
// const zz = [];
const V = [];

function starter() {
  for ( let i = 1; i < N_1-1; i ++ )
  {
    for ( let j = 1; j < N_1-1; j ++ )
    {
      const cx2 = Cx2*(.5*(q[i][j]+q[i+1][j])*(u_n[i+1][j]-u_n[i][j]) - .5*(q[i-1][j]+q[i][j])*(u_n[i][j] - u_n[i-1][j]));
      const cy2 = Cy2*(.5*(q[i][j]+q[i][j+1])*(u_n[i][j+1]-u_n[i][j]) - .5*(q[i][j-1]+q[i][j])*(u_n[i][j] - u_n[i][j-1]));
      const u_n_s = u_n[i][j]+2*dt*V[i][j];
      u_np1[i][j] = u_n_s + cx2 + cy2;
    }
  }
}

function dirichlet() {
  for ( let i = 0; i < N_1; i ++ )
  {
    u_np1[0][i]=0;
    u_np1[N_1-1][i]=0;
    u_np1[i][0]=0;
    u_np1[i][N_1-1]=0;
  }
}


function nuemann1() {
  var i = 0;var j = 0;
u_np1[i][j] = 2*u_n[i][j] - (u_n[i][j] - 2*dt*V[i][j]) + Cx2*(q[i][j] + q[i+1][j])*(u_n[i+1][j] - u_n[i][j]) + Cy2*(q[i][j] + q[i][j+1])*(u_n[i][j+1] - u_n[i][j]);
  i = 0;
  j = res;
u_np1[i][j] = 2*u_n[i][j] - (u_n[i][j] - 2*dt*V[i][j]) + Cx2*(q[i][j] + q[i+1][j])*(u_n[i+1][j] - u_n[i][j]) + Cy2*(q[i][j] + q[i][j-1])*(u_n[i][j-1] - u_n[i][j]);
  i = res;
  j = 0;
u_np1[i][j] = 2*u_n[i][j] - (u_n[i][j] - 2*dt*V[i][j]) + Cx2*(q[i][j] + q[i-1][j])*(u_n[i-1][j] - u_n[i][j]) + Cy2*(q[i][j] + q[i][j+1])*(u_n[i][j+1] - u_n[i][j]);
  i = res;
  j = res;
u_np1[i][j] = 2*u_n[i][j] - (u_n[i][j] - 2*dt*V[i][j]) + Cx2*(q[i][j] + q[i-1][j])*(u_n[i-1][j] - u_n[i][j]) + Cy2*(q[i][j] + q[i][j-1])*(u_n[i][j-1] - u_n[i][j]);
  for ( let i = 1; i < res-1; i ++ )
  {
u_np1[0][i] = 2*u_n[0][i] - (u_n[0][i] - 2*dt*V[0][i]) + Cx2*(q[0][i] + q[0+1][i])*(u_n[0+1][i] - u_n[0][i]) + Cy2*(  0.5*(q[0][i] + q[0][i+1])*(u_n[0][i+1] - u_n[0][i])  - 0.5*(q[0][i-1] + q[0][i])*(u_n[0][i] - u_n[0][i-1]) );
u_np1[i][0] = 2*u_n[i][0] - (u_n[i][0] - 2*dt*V[i][0]) + Cx2*(  0.5*(q[i][0] + q[i+1][0])*(u_n[i+1][0] - u_n[i][0])  - 0.5*(q[i-1][0] + q[i][0])*(u_n[i][0] - u_n[i-1][0]) ) + Cy2*(q[i][0] + q[i][0+1])*(u_n[i][0+1] - u_n[i][0]);
u_np1[res][i] = 2*u_n[res][i] - (u_n[res][i] - 2*dt*V[res][i]) + Cx2*(q[res][i] + q[res-1][i])*(u_n[res-1][i] - u_n[res][i]) + Cy2*(  0.5*(q[res][i] + q[res][i+1])*(u_n[res][i+1] - u_n[res][i])  - 0.5*(q[res][i-1] + q[res][i])*(u_n[res][i] - u_n[res][i-1]) );
 u_np1[i][res] = 2*u_n[i][res] - (u_n[i][res] - 2*dt*V[i][res]) + Cx2*(  0.5*(q[i][res] + q[i+1][res])*(u_n[i+1][res] - u_n[i][res])  - 0.5*(q[i-1][res] + q[i][res])*(u_n[i][res] - u_n[i-1][res]) ) + Cy2*(q[i][res] + q[i][res-1])*(u_n[i][res-1] - u_n[i][res]);
  }
}


function nuemann2() {
  var i = 0;var j = 0;
u_np1[i][j] = 2*u_n[i][j] - (u_nm1[i][j]) + Cx2*(q[i][j] + q[i+1][j])*(u_n[i+1][j] - u_n[i][j]) + Cy2*(q[i][j] + q[i][j+1])*(u_n[i][j+1] - u_n[i][j])
  i = 0;
  j = res;
u_np1[i][j] = 2*u_n[i][j] - (u_nm1[i][j]) + Cx2*(q[i][j] + q[i+1][j])*(u_n[i+1][j] - u_n[i][j]) + Cy2*(q[i][j] + q[i][j-1])*(u_n[i][j-1] - u_n[i][j])
  i = res;
  j = 0;
u_np1[i][j] = 2*u_n[i][j] - (u_nm1[i][j]) + Cx2*(q[i][j] + q[i-1][j])*(u_n[i-1][j] - u_n[i][j]) + Cy2*(q[i][j] + q[i][j+1])*(u_n[i][j+1] - u_n[i][j])
  i = res;
  j = res;
u_np1[i][j] = 2*u_n[i][j] - (u_nm1[i][j]) + Cx2*(q[i][j] + q[i-1][j])*(u_n[i-1][j] - u_n[i][j]) + Cy2*(q[i][j] + q[i][j-1])*(u_n[i][j-1] - u_n[i][j])
  for ( let i = 2; i < res-1; i ++ )
  {
u_np1[0][i] = 2*u_n[0][i] - (u_nm1[0][i]) + Cx2*(q[0][i] + q[0+1][i])*(u_n[0+1][i] - u_n[0][i]) + Cy2*(  0.5*(q[0][i] + q[0][i+1])*(u_n[0][i+1] - u_n[0][i])  - 0.5*(q[0][i-1] + q[0][i])*(u_n[0][i] - u_n[0][i-1]) )
u_np1[i][0] = 2*u_n[i][0] - (u_nm1[i][0]) + Cx2*(  0.5*(q[i][0] + q[i+1][0])*(u_n[i+1][0] - u_n[i][0])  - 0.5*(q[i-1][0] + q[i][0])*(u_n[i][0] - u_n[i-1][0]) ) + Cy2*(q[i][0] + q[i][0+1])*(u_n[i][0+1] - u_n[i][0])
u_np1[res][i] = 2*u_n[res][i] - (u_nm1[res][i]) + Cx2*(q[res][i] + q[res-1][i])*(u_n[res-1][i] - u_n[res][i]) + Cy2*(  0.5*(q[res][i] + q[res][i+1])*(u_n[res][i+1] - u_n[res][i])  - 0.5*(q[res][i-1] + q[res][i])*(u_n[res][i] - u_n[res][i-1]) )
 u_np1[i][res] = 2*u_n[i][res] - (u_nm1[i][res]) + Cx2*(  0.5*(q[i][res] + q[i+1][res])*(u_n[i+1][res] - u_n[i][res])  - 0.5*(q[i-1][res] + q[i][res])*(u_n[i][res] - u_n[i-1][res]) ) + Cy2*(q[i][res] + q[i][res-1])*(u_n[i][res-1] - u_n[i][res])
  }
}


function setA2B(a,b) {
  for ( let i = 0; i < N_1; i ++ )
  {
    const row = [];
    for ( let j = 0; j < N_1; j ++ )
    {
      row[j] = b[i][j];
    }
    a[i] = row;
  }
}

function looper() {
  for ( let i = 1; i < N_1-1; i ++ )
  {
    for ( let j = 1; j < N_1-1; j ++ )
    {
      const cx2 = Cx2*(.5*(q[i][j]+q[i+1][j])*(u_n[i+1][j]-u_n[i][j]) - .5*(q[i-1][j]+q[i][j])*(u_n[i][j] - u_n[i-1][j]));
      const cy2 = Cy2*(.5*(q[i][j]+q[i][j+1])*(u_n[i][j+1]-u_n[i][j]) - .5*(q[i][j-1]+q[i][j])*(u_n[i][j] - u_n[i][j-1]));
      const u_n_s = 2*u_n[i][j] - u_nm1[i][j];
      u_np1[i][j] = u_n_s + cx2 + cy2;
      counts+=1;
    }
  }
}


const ParametricGeometries = {

    klein: function ( v, u, target ) {

        u *= Math.PI;
        v *= 2 * Math.PI;

        u = u * 2;
        let x, z;
        if ( u < Math.PI ) {

            x = 3 * Math.cos( u ) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( u ) * Math.cos( v );
            z = - 8 * Math.sin( u ) - 2 * ( 1 - Math.cos( u ) / 2 ) * Math.sin( u ) * Math.cos( v );

        } else {

            x = 3 * Math.cos( u ) * ( 1 + Math.sin( u ) ) + ( 2 * ( 1 - Math.cos( u ) / 2 ) ) * Math.cos( v + Math.PI );
            z = - 8 * Math.sin( u );

        }

        const y = - 2 * ( 1 - Math.cos( u ) / 2 ) * Math.sin( v );

        target.set( x, y, z );

    },

    plane: function ( width, height ) {

        return function ( u, v, target ) {

            const x = u * width;
            const y = 0;
            const z = v * height;

            target.set( x, y, z );

        };

    },

    mobius: function ( u, t, target ) {

        // flat mobius strip
        // http://www.wolframalpha.com/input/?i=M%C3%B6bius+strip+parametric+equations&lk=1&a=ClashPrefs_*Surface.MoebiusStrip.SurfaceProperty.ParametricEquations-
        u = u - 0.5;
        const v = 2 * Math.PI * t;

        const a = 2;

        const x = Math.cos( v ) * ( a + u * Math.cos( v / 2 ) );
        const y = Math.sin( v ) * ( a + u * Math.cos( v / 2 ) );
        const z = u * Math.sin( v / 2 );

        target.set( x, y, z );

    },

    mobius3d: function ( u, t, target ) {

        // volumetric mobius strip

        u *= Math.PI;
        t *= 2 * Math.PI;

        u = u * 2;
        const phi = u / 2;
        const major = 2.25, a = 0.125, b = 0.65;

        let x = a * Math.cos( t ) * Math.cos( phi ) - b * Math.sin( t ) * Math.sin( phi );
        const z = a * Math.cos( t ) * Math.sin( phi ) + b * Math.sin( t ) * Math.cos( phi );
        const y = ( major + x ) * Math.sin( u );
        x = ( major + x ) * Math.cos( u );

        target.set( x, y, z );

    },



    gaussian3d: function ( width1, width2 ) {

        return function ( u, v, target ) {

            const x = (u) * width1;
            const y = (v) * width2;
            const z = 1.5*Math.exp(-100*Math.pow((x-2.5),2)-100*Math.pow((y-2.5),2));
            // const z = 0;
            // const z = Math.exp(-8*Math.pow((x-2.5),2)-8*Math.pow((y-2.5),2))+4*Math.exp(-20*Math.pow((x-2.5),2)-20*Math.pow((y-2.5),2));
            target.set( x, z, y );

        };

    }

};