module.exports = function (mesh, opts) {
  if (!opts) opts = {};
  var vars = opts.attributes ? {} : null;
  var vkeys = vars && Object.keys(opts.attributes)
  if (vars) {
    for (var k = 0; k < vkeys.length; k++) {
      vars[vkeys[k]] = []
    }
  }

  var i, j;
  var pts = [];
  var cells = [];
  var barycentricAttrs = [];

  var mpts = mesh.positions;
  var mcells = mesh.cells;

  var c = 0;
  for (i = 0; i < mesh.cells.length; i++) {
    var cell = mcells[i];
    if (cell.length === 3) {
      pts.push(mpts[cell[0]]);
      pts.push(mpts[cell[1]]);
      pts.push(mpts[cell[2]]);
      barycentricAttrs.push([0, 0]);
      barycentricAttrs.push([1, 0]);
      barycentricAttrs.push([0, 1]);
      cells.push(c++);
      cells.push(c++);
      cells.push(c++);
      if (vkeys) {
        for (j = 0; j < vkeys.length; j++) {
          var vkey = vkeys[j];
          vars[vkey].push(opts.attributes[vkey][cell[0]]);
          vars[vkey].push(opts.attributes[vkey][cell[1]]);
          vars[vkey].push(opts.attributes[vkey][cell[2]]);
        }
      }
    }
  }

  var ret = {
    positions: pts,
    attributes: vars,
    barycentric: barycentricAttrs
  };

  if (mesh.cells) {
    ret.cells = cells;
  }

  return ret;
};
