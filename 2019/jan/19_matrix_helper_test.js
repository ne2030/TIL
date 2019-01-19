const assert = require('assert');
const Matrix = require('./17_matrix_helper');

const mat1 = [[1, 2, 3]];
const mat2 = [[2, 3, 4]];
const mat3 = [[1, 2, 3], [4, 5, 6]];
const mat4 = [[10, 11, 12], [13, 14, 15]];

assert.deepEqual(Matrix.add(mat1, mat2), [[3, 5, 7]]);
assert.deepEqual(Matrix.add(mat3, mat4), [[11, 13, 15], [17, 19, 21]]);

assert.deepEqual(Matrix.multiply(mat1, mat2), [[2, 6, 12]]);
assert.deepEqual(Matrix.multiply(mat3, [[10, 11, 12], [1, 2, 3]]), [[10, 22, 36], [4, 10, 18]]);

const mat9 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
assert.deepEqual(Matrix.getCol(3, mat9), [[3], [6], [9]]);
