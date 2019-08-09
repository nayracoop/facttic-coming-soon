var isMobile = (function(a){ return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) })(navigator.userAgent||navigator.vendor||window.opera);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if(isMobile) document.body.classList.add("mobile");
if(isSafari) document.body.classList.add("safari");

var n = 100;     // número de circulos
var circulos = [];
var lines;
var colors = [ [ 0x0d, 0x00, 0x52 ], [ 0x49, 0x09, 0x8b ], [ 0x3f, 0x9e, 0xd1 ], [ 0x02, 0x77, 0x08 ], [ 0xfe, 0xd1, 0x01 ], [ 0xfe, 0x76, 0x0f ], [ 0xbf, 0x00, 0x00 ] ];

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(255);

	n = ceil((width*height)*0.00005);

  lines = createGraphics(width, height);
	lines.pixelDensity(2);
	lines.scale(1/2);
  lines.background(255);

  for (var i=0; i<n; i++) {
    circulos[i] = new Circulo();
  }

}

function draw() {


  lines.blendMode(ADD);
  lines.fill(3);
  lines.rect(0,0,width,height);
  lines.blendMode(BLEND);
  for (var i=0; i<n; i++) {
    for (var j=i+1; j<n; j++) {
      circulos[i].interactuar(circulos[j], lines);
    }
  }

  image(lines, 0, 0, width, height);

  for (var i=0; i<n; i++) {
    circulos[i].mover();
    circulos[i].dibujar();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
	lines = createGraphics(width, height);
	lines.pixelDensity(2);
	lines.scale(1/2);
	lines.background(255);
}

function Circulo() {

   // Variables de la clase

  this.x = random(0,width);
  this.y = random(0,height);
  this.vx = random(-0.5,0.5);
  this.vy = random(-0.5,0.5);
	this.color = colors[floor(random(colors.length))]; //colors[floor(random(colors.length))];
  this.r = this.color[0];//100;
	this.g = this.color[1];//160;
	this.b = this.color[2];//255;
	this.d = random(4,7);
	this.radio = 200;//width/12;
	this.a = 0;

  // Funciones de la clase

  this.mover = function() {

    this.x += this.vx;
    this.y += this.vy;

    if (this.x >= width) {
      this.x = this.x - width;
    }

    if (this.x < 0) {
      this.x = this.x + width;
    }

    if (this.y >= height) {
      this.y = this.y - height;
    }

    if (this.y < 0) {
      this.y = this.y + height;
    }

		this.a *= 0.9;

  }

  this.dibujar = function() {

   noStroke();
   fill(this.r, this.g, this.b, this.a);
   ellipse(this.x,this.y,this.d,this.d);

  }

  this.interactuar = function(other, pg) {

    if ( dist(this.x,this.y,other.x,other.y) <= this.radio ) {
      pg.stroke(140,150,170,20);
      pg.line(this.x,this.y,other.x,other.y);
			this.a = 255;
			other.a = 255;
    }

  }

}
