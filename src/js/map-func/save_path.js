function savePath(lines) {
    Promise.all(createEdges(lines))
        .then(function () {
            if (!edgesIds.filter(function(id){return !id;}).length) {
                alert('All paths are created successfully!');
            }
        }).catch(creationFailed);
}

function createEdges(lines) {
        return lines.map(function (line) {
            return createEdgeFromLine(line);
        });
}

function createEdgeFromLine(line) {
    var edge = {
        typeid: line.typeid,
        sourceid: line.start.coordinateId,
        targetid: line.end.coordinateId
    };

    return Promise.resolve(createEdge(edge))
        .then(parseEdgeId)
        .then(function () {
            line.start.unbounce();
            line.end.unbounce();
        }).catch(creationFailed);

    function parseEdgeId(result) {
        var parsedResult = /0\. Edge with id=(\d+) was successfully created\./.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            parsedResult = /-1\. Edge \(.*\) cannot be created.*It's id=(\d+)/.exec(result);
            if (parsedResult && parsedResult[1]) {
                return parsedResult[1];
            } else {
                throw new Error('edge creation failed');
            }
        }
    }
}

