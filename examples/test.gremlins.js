var horde = gremlins.createHorde()
    .gremlin(gremlins.species.clicker())
    .gremlin(gremlins.species.scroller())
    .mogwai(gremlins.mogwais.gizmo())
    .mogwai(gremlins.mogwais.fps());

window.phantomHorde && window.phantomHorde(horde, { nb: 20 });
