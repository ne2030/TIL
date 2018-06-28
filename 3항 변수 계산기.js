/*

We have 3 equations with 3 unknowns x, y, and z and we are to solve for these unknowns.

Equations 4x -3y +z = -10, 2x +y +3z = 0, and -x +2y -5z = 17 will be passed in as an array of [[4, -3, 1, -10], [2, 1, 3, 0], [-1, 2, -5, 17]] and the result should be returned as an array like [1, 4, -2] (i.e. [x, y, z]).

Note: In C++ do not use new or malloc to allocate memory for the returned variable as allocated memory will not be freed in the Test Cases. Setting the variable as static will do.

*/

/*
* 함수형 풀이
*/

const curry2 = fn => (...args) => (args.length === 2 ? fn(...args) : a => fn(...args, a));
const size = xs => xs.length;
const head = xs => xs[0];
const reduce = (xs, f, z) => xs.reduce(f, z);
const mul = (a, b) => a * b;
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const divide = (a, b) => a / b;
const boxing = v => [v];
const popFirst = xs => xs.slice(1);
const pipe = (...fns) => v => reduce(fns, (memo, fn) => fn(memo), v);
const go = (v, ...fns) => pipe(...fns)(v);
const ifElse = (p, fn, elseFn) => v => (p(v) ? fn(v) : elseFn(v));
const isEqual = curry2((a, b) => a === b);
const partition = (xs, f) => xs.reduce(([v, rest], cur) => (f(cur) ? [[...v, cur], rest] : [v, [...rest, cur]]), [[], []]);

const crossMap = (a1, a2, f) => a1.map((el, idx) => f(el, a2[idx]));
const getEqVal = ([cof, val]) => divide(val, cof);

function reduceVar(e1, e2) {
  const [m1, m2] = [head(e1), head(e2)];
  return popFirst(crossMap(e1, e2, (p, l) => sub(mul(p, m2), mul(l, m1))));
}

const putValExpFirst = curry2((eq, vals) => {
  const r = eq.pop(1);
  const [first, ...cofs] = eq;
  const x = divide(sub(r, reduce(crossMap(cofs, vals, mul), add, 0)), first);
  return [x, ...vals];
});

function solveEq(eq) {
  const [tobeReduced, reducedRest] = partition(eq, head);
  const reducedTotal = [...reducedRest.map(popFirst), ...tobeReduced.reduce(([acc, prev], cur, idx) => idx ? [[...acc, reduceVar(prev, cur)], cur] : [[], cur], [])[0]];
  return go(reducedTotal,
    ifElse(pipe(size, isEqual(1)), pipe(head, getEqVal, boxing), solveEq),
    putValExpFirst(head(tobeReduced))
  );
}


/*
* 다른 정답들 1
*/

function solveEq(eq){

    /*------------------------------------------------------------------------------------------------------------------
     -->  Resolveremos el ejercicio por el sistema de Cramer o Determinantes  <--  
     -----------------------------------------------------------------------------------------------------------------*/

    /* Separo las 3 ecuaciones */
    var eq1 = eq[0];
    var eq2 = eq[1];
    var eq3 = eq[2];

    /* Calculamos el determinante del Sistema */
    var ds = ((eq1[0] * eq2[1] * eq3[2]) + (eq2[0] * eq3[1] * eq1[2]) + (eq3[0] * eq1[1] * eq2[2]))
            - ((eq2[0] * eq1[1] * eq3[2]) + (eq1[0] * eq3[1] * eq2[2]) + (eq3[0] * eq2[1] * eq1[2]));

    /* Calculamos el determinante de X */
    var dx = ((eq1[3] * eq2[1] * eq3[2]) + (eq2[3] * eq3[1] * eq1[2]) + (eq3[3] * eq1[1] * eq2[2]))
            - ((eq2[3] * eq1[1] * eq3[2]) + (eq1[3] * eq3[1] * eq2[2]) + (eq3[3] * eq2[1] * eq1[2]));

    /* Calculamos el determinante de Y */
    var dy = ((eq1[0] * eq2[3] * eq3[2]) + (eq2[0] * eq3[3] * eq1[2]) + (eq3[0] * eq1[3] * eq2[2]))
            - ((eq2[0] * eq1[3] * eq3[2]) + (eq1[0] * eq3[3] * eq2[2]) + (eq3[0] * eq2[3] * eq1[2]));

    /* Calculamos el determinante de Z */
    var dz = ((eq1[0] * eq2[1] * eq3[3]) + (eq2[0] * eq3[1] * eq1[3]) + (eq3[0] * eq1[1] * eq2[3]))
            - ((eq2[0] * eq1[1] * eq3[3]) + (eq1[0] * eq3[1] * eq2[3]) + (eq3[0] * eq2[1] * eq1[3]));

    /* Calculamos el valor de la variable X */
    var x = dx / ds;

    /* Calculamos el valor de la variable Y */
    var y = dy / ds;

    /* Calculamos el valor de la variable Z */
    var z = dz / ds;

    /* Conformamos el registro repuesta de la función */
    return [x, y, z];

}

/*
* 다른 정답들 2
*/

function solveEq(eq){
    /*
    00 01 02 03
    10 11 12 13
    20 21 22 23
    */
    let delta=eq[0][0]*eq[1][1]*eq[2][2]+eq[0][1]*eq[1][2]*eq[2][0]+eq[0][2]*eq[1][0]*eq[2][1]-eq[0][0]*eq[2][1]*eq[1][2]-eq[0][1]*eq[2][2]*eq[1][0]-eq[0][2]*eq[2][0]*eq[1][1],
    deltaX=eq[0][3]*eq[1][1]*eq[2][2]+eq[0][1]*eq[1][2]*eq[2][3]+eq[0][2]*eq[1][3]*eq[2][1]-eq[0][3]*eq[2][1]*eq[1][2]-eq[0][1]*eq[2][2]*eq[1][3]-eq[0][2]*eq[2][3]*eq[1][1],
    deltaY=eq[0][0]*eq[1][3]*eq[2][2]+eq[0][3]*eq[1][2]*eq[2][0]+eq[0][2]*eq[1][0]*eq[2][3]-eq[0][0]*eq[2][3]*eq[1][2]-eq[0][3]*eq[2][2]*eq[1][0]-eq[0][2]*eq[2][0]*eq[1][3],
    deltaZ=eq[0][0]*eq[1][1]*eq[2][3]+eq[0][1]*eq[1][3]*eq[2][0]+eq[0][3]*eq[1][0]*eq[2][1]-eq[0][0]*eq[2][1]*eq[1][3]-eq[0][1]*eq[2][3]*eq[1][0]-eq[0][3]*eq[2][0]*eq[1][1]
    return [deltaX/delta, deltaY/delta, deltaZ/delta]
  }

/*
* 다른 정답들 3
*/

function solveEq(eq){

    function multMatrixNumber(a,A)  // a - число, A - матрица (двумерный массив)
{   
    var m = A.length, n = A[0].length, B = [];
    for (var i = 0; i < m; i++)
    { B[i] = [];
        for (var j = 0; j < n; j++) B[i][j] = a*A[i][j];
    }
    return B;
}
    
    function MultiplyMatrix(A,B)
{
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++)
    { for (var i = 0; i < rowsA; i++)
        { var t = 0;
            for (var j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
            C[i][k] = t;
        }
    }
    return C;
}
    
    var B = [];
    B[0] = [eq[0][3]];
    B[1] = [eq[1][3]];
    B[2] = [eq[2][3]];
    console.log(B);
    
    var A = eq.map(function (elem, i, array){
    elem.length = 3;
    return elem;
    });
    
    var Delta = A[0][0]*A[1][1]*A[2][2] + A[0][1]*A[1][2]*A[2][0] + A[0][2]*A[1][0]*A[2][1] -
        A[0][2]*A[1][1]*A[2][0] - A[0][0]*A[1][2]*A[2][1] - A[0][1]*A[1][0]*A[2][2]
    
    console.log(Delta);
    var M00 = A[1][1]*A[2][2] - A[1][2]*A[2][1];
    var M01 = -(A[1][0]*A[2][2] - A[1][2]*A[2][0]);
    var M02 = A[1][0]*A[2][1] - A[1][1]*A[2][0];
    
    var M10 = -(A[0][1]*A[2][2] - A[0][2]*A[2][1]);
    var M11 = A[0][0]*A[2][2] - A[0][2]*A[2][0];
    var M12 = -(A[0][0]*A[2][1] - A[0][1]*A[2][0]);
    
    var M20 = A[0][1]*A[1][2] - A[0][2]*A[1][1];
    var M21 = -(A[0][0]*A[1][2] - A[0][2]*A[1][0]);
    var M22 = A[0][0]*A[1][1] - A[0][1]*A[1][0];
    
    var C = [[M00, M01, M02],
            [M10, M11, M12],
            [M20, M21, M22]]
    
    var Ct = [[M00, M10, M20],
            [M01, M11, M21],
            [M02, M12, M22]]
    
    var A1 = multMatrixNumber(1/Delta, Ct);
    
    var Xt = MultiplyMatrix(A1,B);
    
    var X = [Math.round(Xt[0]),Math.round(Xt[1]), Math.round(Xt[2])]
    
    return X;
}

/*
* 다른 정답들 4
*/

function solveEq(eq){

    var mat = [[0,0,0], [0,0,0], [0,0,0]],
        dt = 0,
        xyz = [0,0,0];
    
    for (var i = 0; i < 3; i++) {
      dt += (eq[0][i] * (eq[1][(i+1)%3] * eq[2][(i+2)%3] - eq[1][(i+2)%3] * eq[2][(i+1)%3]));
    }
    
    for (var i = 0; i < 3; ++i) {
      for(var n = 0; n < 3; ++n) {
        mat[i][n] = ((eq[(n+1)%3][(i+1)%3] * eq[(n+2)%3][(i+2)%3]) - (eq[(n+1)%3][(i+2)%3] * eq[(n+2)%3][(i+1)%3]))/dt;
      }
    }
    
    for (var i = 0; i < 3; ++i) {
        xyz[i] = Math.round(mat[i][0] * eq[0][3] +  mat[i][1] * eq[1][3] + mat[i][2] * eq[2][3]);
    }
    
    return xyz;
  }



