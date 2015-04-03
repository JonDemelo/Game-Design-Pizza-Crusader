var d3BoardData = [
	{id: 0, x: 0.15, y: 0.14},
    {id: 1, x: 0.23, y: 0.10},
    {id: 2, x: 0.37, y: 0.08},
    {id: 3, x: 0.74, y: 0.09},
    {id: 4, x: 0.80, y: 0.10},
    {id: 5, x: 0.15, y: 0.18},
    {id: 6, x: 0.23, y: 0.33},
    {id: 7, x: 0.37, y: 0.31},
    {id: 8, x: 0.70, y: 0.23},
    {id: 9, x: 0.85, y: 0.18},
    {id: 10, x: 0.01, y: 0.49},
    {id: 11, x: 0.23, y: 0.47},
    {id: 12, x: 0.37, y: 0.37},
    {id: 13, x: 0.74, y: 0.42},
    {id: 14, x: 0.85, y: 0.44},
    {id: 15, x: 0.01, y: 0.63},
    {id: 16, x: 0.23, y: 0.57},
    {id: 17, x: 0.37, y: 0.52},
    {id: 18, x: 0.74, y: 0.51},
    {id: 19, x: 0.85, y: 0.65},
    {id: 20, x: 0.01, y: 0.67},
    {id: 21, x: 0.23, y: 0.81},
    {id: 22, x: 0.37, y: 0.73},
    {id: 23, x: 0.74, y: 0.69},
    {id: 24, x: 0.85, y: 0.72},
    {id: 25, x: 0.01, y: 0.99},
    {id: 26, x: 0.23, y: 0.86},
    {id: 27, x: 0.37, y: 0.89},
    {id: 28, x: 0.74, y: 0.94},
    {id: 29, x: 0.85, y: 0.99}
]

var neighboursGenerated = false;

function generateNeighbourGraph(allCornerPoints){
	if ( neighboursGenerated ){
		return;
	}
	allCornerPoints.forEach(function(zoneCornerPoints,idx){
		var neighbours = [];
		//loop through the zone's corner points
		zoneCornerPoints.forEach(function(cornerPoint){
			//loop through other zones and find zones that have same corner point
			allCornerPoints.forEach(function(zcPoints2,idx2){
				if ( idx2 == idx){
					return;
				}

				zcPoints2.forEach(function(cp2){
					if ( cp2[0] == cornerPoint[0] && cp2[1] == cornerPoint[1]){
						neighbours.push(idx2);
						found = true;
						return;
					}
				})
			})
			
		})
		var uniqueNeighbours = []
		$.each(neighbours, function(i, el){
    		if($.inArray(el, uniqueNeighbours) === -1) uniqueNeighbours.push(el);
		});
		d3BoardData[idx].neighbours = uniqueNeighbours;
	})

	neighboursGenerated = true;
}