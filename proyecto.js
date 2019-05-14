var coloresRamas = ['#7c4d81','#5faa9f','#91bd61','#d8af3d','#e77c30','#4b91c0','white']
var nombreRamas = ['Arte y Humanidades','Ciencias de la Salud','Ciencias','Ingeniería y Arquitectura','Sociales y Jurídicas','Educación']
var nombreProvincias = ['Ávila','Burgos','León','Palencia','Salamanca','Segovia','Soria','Valladolid','Zamora']
var ancho = 960;
var alto = 500;
var cursos = ['2011-2012','2012-2013','2013-2014','2014-2015','2015-2016','2016-2017','2017-2018']

var projection = d3
    .geoMercator()
    .scale(6200)
    .center([-3, 41.6]);

	var title = d3.select("#visualization")
	.append("svg")
	.attr("class","titulo")
	.attr("width", ancho)
	.attr("height", alto/12); 

	title.append('text')
	    .attr('x',0)
	    .attr('y',20)
	    .text('RAMA DE CONOCIMIENTO PREDOMINANTE SEGÚN MATRICULADOS')
	    .style('font-size','160%')
	    .style('fill','black');



	var map = d3.select("#visualization")
	.append("svg")
	.attr("class","mapa")
	.attr("width", ancho)
	.attr("height", alto); 

	map.attr("transform", "translate(" + (0.45 * ancho) + "," + (-0.06 * alto) + ")");
	title.attr("transform", "translate(" + (0.35 * ancho) + "," + (-0.06 * alto) + ")");
  
 	var path = d3.geoPath().projection(projection);

 	var tooltip = d3.select("#visualization")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("padding", "8px")
            .style("background-color", "#bc3a3a")
            .style("opacity", "0.95")
            .style("border-radius", "6px")
            .style("stroke", "black")
            .style("border-style", "solid")
            .style("border-width", "1px")
            .style("text-align", "center")
            .style("font-family", "monospace")
            .text("");


function makeVisualization(){
  
	d3.json("cyl.geojson", drawMaps);


	function drawMaps(geojson) {


	    map.selectAll("path")
	      .data(geojson.features)
	      .enter()
	      .append("path")
	      .attr("class","provincia")
	      .attr("d", path)
	      .attr("fill", 'white')
	      .attr("fill-opacity", 0.8)
	      .on('mouseover', mouseover)
	      .on('mouseout', mouseout)
	      .on('mousemove',mousemove)
	      .attr("stroke", "black");

	     /*map.selectAll("text")
	      .data(geojson.features)
	      .enter()
	      .append("text")
	      .attr("class","nombre")
	      .attr("x", function(d){
	      		return path.centroid(d)[0];
	      })
	      .attr("y", function(d){
	      		return path.centroid(d)[1];
	      })
	      .text(function(d){
	      	return d.properties.name;
	      });*/
	}
}

function refreshVisualization(predominantes){
  
	d3.json("cyl.geojson", actualizeMap);


	function actualizeMap(geojson) {

	    d3.selectAll(".provincia")
	      .attr("fill", function(d,j) {
	      				console.log(d.properties.name);
	      				return coloresRamas[predominantes[j]];
						});
	}
}


function maxMat(curso){
	
	
	d3.csv(document.getElementById("univ").value, function(data) {
		maxs = [];
		maxMatrs = [];
		for (var j = 0; j < nombreProvincias.length;j++){
			var maximo = 0;
			var maximoIndex = false;
			var provincia = nombreProvincias[j];
		
			for (var i = 0;i < data.length;i++){
				if(data[i].Curso == curso){

					switch(provincia){
						case 'Ávila':
							if(parseInt(data[i].Avila) > maximo){
								maximo = parseInt(data[i].Avila);
								maximoIndex = i;
								}
							break;
						case 'Burgos':
							if(parseInt(data[i].Burgos) > maximo){
								maximo = parseInt(data[i].Burgos);
								maximoIndex = i;
								}
							break;
						case 'León':
							if(parseInt(data[i].Leon) > maximo){
								maximo = parseInt(data[i].Leon);
								maximoIndex = i;
								}
							break;
						case 'Palencia':
							if(parseInt(data[i].Palencia) > maximo){
								maximo = parseInt(data[i].Palencia);
								maximoIndex = i;
								}
							break;
						case 'Salamanca':
							if(parseInt(data[i].Salamanca) > maximo){
								maximo = parseInt(data[i].Salamanca);
								maximoIndex = i;
								}
							break;
						case 'Segovia':
							if(parseInt(data[i].Segovia) > maximo){
								maximo = parseInt(data[i].Segovia);
								maximoIndex = i;
								}
							break;
						case 'Soria':
							if(parseInt(data[i].Soria) > maximo){
								maximo = parseInt(data[i].Soria);
								maximoIndex = i;
								}
							break;
						case 'Valladolid':
							if(parseInt(data[i].Valladolid) > maximo){
								maximo = parseInt(data[i].Valladolid);
								maximoIndex = i;
								}
							break;
						case 'Zamora':
							if(parseInt(data[i].Zamora) > maximo){
								maximo = parseInt(data[i].Zamora);
								maximoIndex = i;
								}
							break;
					} 
				}

			}

			if(maximoIndex == false){
				maxMatrs.push(maximo);
				maximoIndex = 6;
			}
			else{
				maxMatrs.push(maximo);
				maximoIndex = parseInt(data[maximoIndex].Rama);
			}
			maxs.push(maximoIndex);
		}
		console.log(maxs);
		refreshVisualization(maxs);
	});
		
}

function mouseover(d){
  d3.select(this).attr("fill-opacity", 1);
  var curso = cursos[document.getElementById("myRange").value - 1];
  var provincia = d.properties.name;

  d3.csv(document.getElementById("univ").value, function(data) {
		matriculas = [];
		mats = 0;
			for (var i = 0;i < data.length;i++){
				if(data[i].Curso == curso){

					switch(provincia){
						case 'Ávila':
								mats = data[i].Avila;
							break;
						case 'Burgos':
								mats = data[i].Burgos;
							break;
						case 'León':
								mats = data[i].Leon;
							break;
						case 'Palencia':
								mats = data[i].Palencia;
							break;
						case 'Salamanca':
								mats = data[i].Salamanca;
							break;
						case 'Segovia':
								mats = data[i].Segovia;
							break;
						case 'Soria':
								mats = data[i].Soria;
							break;
						case 'Valladolid':
								mats = data[i].Valladolid;
							break;
						case 'Zamora':
								mats = data[i].Zamora;
							break;
					} 
					if(mats == ""){
						mats = 'No hay datos.';
					}
				matriculas.push(mats);
				}
		}
		
		tooltip.html("<big><b><ins>" + d.properties.name + "</ins></b></big>"
		   + "<br>" + nombreRamas[0]+": "+ matriculas[0]
		   + "<br>" + nombreRamas[1]+": "+ matriculas[1]
		   + "<br>" + nombreRamas[2]+": "+ matriculas[2]
		   + "<br>" + nombreRamas[3]+": "+ matriculas[3]
		   + "<br>" + nombreRamas[4]+": "+ matriculas[4]
		   + "<br>" + nombreRamas[5]+": "+ matriculas[5]);
	});

    tooltip.style("background-color", "white");
    tooltip.style("visibility", "visible");
}

function mouseout(d){

  d3.select(this).attr("fill-opacity", 0.8);

  tooltip.style("visibility", "hidden"); 
}

function mousemove(d){
	return tooltip.style("top", (d3.event.pageY - 10) + "px")
	.style("left", (d3.event.pageX + 10) + "px");
}


