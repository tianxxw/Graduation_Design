module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1658901996752, function(require, module, exports) {


const Assert = require('@hapi/hoek/lib/assert');


const internals = {};


exports.Sorter = class {

    constructor() {

        this._items = [];
        this.nodes = [];
    }

    add(nodes, options) {

        options = options || {};

        // Validate rules

        const before = [].concat(options.before || []);
        const after = [].concat(options.after || []);
        const group = options.group || '?';
        const sort = options.sort || 0;                   // Used for merging only

        Assert(!before.includes(group), `Item cannot come before itself: ${group}`);
        Assert(!before.includes('?'), 'Item cannot come before unassociated items');
        Assert(!after.includes(group), `Item cannot come after itself: ${group}`);
        Assert(!after.includes('?'), 'Item cannot come after unassociated items');

        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }

        for (const node of nodes) {
            const item = {
                seq: this._items.length,
                sort,
                before,
                after,
                group,
                node
            };

            this._items.push(item);
        }

        // Insert event

        if (!options.manual) {
            const valid = this._sort();
            Assert(valid, 'item', group !== '?' ? `added into group ${group}` : '', 'created a dependencies error');
        }

        return this.nodes;
    }

    merge(others) {

        if (!Array.isArray(others)) {
            others = [others];
        }

        for (const other of others) {
            if (other) {
                for (const item of other._items) {
                    this._items.push(Object.assign({}, item));      // Shallow cloned
                }
            }
        }

        // Sort items

        this._items.sort(internals.mergeSort);
        for (let i = 0; i < this._items.length; ++i) {
            this._items[i].seq = i;
        }

        const valid = this._sort();
        Assert(valid, 'merge created a dependencies error');

        return this.nodes;
    }

    sort() {

        const valid = this._sort();
        Assert(valid, 'sort created a dependencies error');

        return this.nodes;
    }

    _sort() {

        // Construct graph

        const graph = {};
        const graphAfters = Object.create(null);            // A prototype can bungle lookups w/ false positives
        const groups = Object.create(null);

        for (const item of this._items) {
            const seq = item.seq;                           // Unique across all items
            const group = item.group;

            // Determine Groups

            groups[group] = groups[group] || [];
            groups[group].push(seq);

            // Build intermediary graph using 'before'

            graph[seq] = item.before;

            // Build second intermediary graph with 'after'

            for (const after of item.after) {
                graphAfters[after] = graphAfters[after] || [];
                graphAfters[after].push(seq);
            }
        }

        // Expand intermediary graph

        for (const node in graph) {
            const expandedGroups = [];

            for (const graphNodeItem in graph[node]) {
                const group = graph[node][graphNodeItem];
                groups[group] = groups[group] || [];
                expandedGroups.push(...groups[group]);
            }

            graph[node] = expandedGroups;
        }

        // Merge intermediary graph using graphAfters into final graph

        for (const group in graphAfters) {
            if (groups[group]) {
                for (const node of groups[group]) {
                    graph[node].push(...graphAfters[group]);
                }
            }
        }

        // Compile ancestors

        const ancestors = {};
        for (const node in graph) {
            const children = graph[node];
            for (const child of children) {
                ancestors[child] = ancestors[child] || [];
                ancestors[child].push(node);
            }
        }

        // Topo sort

        const visited = {};
        const sorted = [];

        for (let i = 0; i < this._items.length; ++i) {          // Looping through item.seq values out of order
            let next = i;

            if (ancestors[i]) {
                next = null;
                for (let j = 0; j < this._items.length; ++j) {  // As above, these are item.seq values
                    if (visited[j] === true) {
                        continue;
                    }

                    if (!ancestors[j]) {
                        ancestors[j] = [];
                    }

                    const shouldSeeCount = ancestors[j].length;
                    let seenCount = 0;
                    for (let k = 0; k < shouldSeeCount; ++k) {
                        if (visited[ancestors[j][k]]) {
                            ++seenCount;
                        }
                    }

                    if (seenCount === shouldSeeCount) {
                        next = j;
                        break;
                    }
                }
            }

            if (next !== null) {
                visited[next] = true;
                sorted.push(next);
            }
        }

        if (sorted.length !== this._items.length) {
            return false;
        }

        const seqIndex = {};
        for (const item of this._items) {
            seqIndex[item.seq] = item;
        }

        this._items = [];
        this.nodes = [];

        for (const value of sorted) {
            const sortedItem = seqIndex[value];
            this.nodes.push(sortedItem.node);
            this._items.push(sortedItem);
        }

        return true;
    }
};


internals.mergeSort = (a, b) => {

    return a.sort === b.sort ? 0 : (a.sort < b.sort ? -1 : 1);
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1658901996752);
})()
//miniprogram-npm-outsideDeps=["@hapi/hoek/lib/assert"]
//# sourceMappingURL=index.js.map