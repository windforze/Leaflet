describe('LatLngBounds', function() {
	var a, c;

	beforeEach(function() {
		a = new L.LatLngBounds(
			new L.LatLng(14, 12),
			new L.LatLng(30, 40));
		c = new L.LatLngBounds();
	});

	describe('constructor', function () {
		it('instantiates either passing two latlngs or an array of latlngs', function () {
			var b = new L.LatLngBounds([
				new L.LatLng(14, 12),
				new L.LatLng(30, 40)
			]);
			expect(b).to.eql(a);
			expect(b.getNorthWest()).to.eql(new L.LatLng(30, 12));
		});
	});

	describe('#extend', function () {
		it('extends the bounds by a given point', function () {
			a.extend(new L.LatLng(20, 50));
			expect(a.getNorthEast()).to.eql(new L.LatLng(30, 50));
		});

		it('extends the bounds by given bounds', function () {
			a.extend([[20, 50], [8, 40]]);

			expect(a.getSouthEast()).to.eql(new L.LatLng(8, 50));
		});
	});

	describe('#getCenter', function () {
		it('returns the bounds center', function () {
			expect(a.getCenter()).to.eql(new L.LatLng(22, 26));
		});
	});

	describe('#pad', function () {
		it('pads the bounds by a given ratio', function () {
			var b = a.pad(0.5);

			expect(b).to.eql(L.latLngBounds([[6, -2], [38, 54]]));
		});
	});

	describe('#equals', function () {
		it('returns true if bounds equal', function () {
			expect(a.equals([[14, 12], [30, 40]])).to.eql(true);
			expect(a.equals([[14, 13], [30, 40]])).to.eql(false);
			expect(a.equals(null)).to.eql(false);
		});
	});

	describe('#isValid', function() {
		it('returns true if properly set up', function() {
			expect(a.isValid()).to.be.ok();
		});
		it('returns false if is invalid', function() {
			expect(c.isValid()).to.not.be.ok();
		});
		it('returns true if extended', function() {
			c.extend([0, 0]);
			expect(c.isValid()).to.be.ok();
		});
	});

	describe('#getWest', function () {
		it('returns a proper bbox west value', function() {
			expect(a.getWest()).to.eql(12);
		});
	});

	describe('#getSouth', function () {
		it('returns a proper bbox south value', function() {
			expect(a.getSouth()).to.eql(14);
		});

	});

	describe('#getEast', function () {
		it('returns a proper bbox east value', function() {
			expect(a.getEast()).to.eql(40);
		});

	});

	describe('#getNorth', function () {
		it('returns a proper bbox north value', function() {
			expect(a.getNorth()).to.eql(30);
		});

	});

	describe('#toBBoxString', function () {
		it('returns a proper left,bottom,right,top bbox', function() {
			expect(a.toBBoxString()).to.eql("12,14,40,30");
		});

	});

	describe('#getNorthWest', function () {
		it('returns a proper north-west LatLng', function() {
			expect(a.getNorthWest()).to.eql(new L.LatLng(a.getNorth(), a.getWest()));
		});

	});

	describe('#getSouthEast', function () {
		it('returns a proper south-east LatLng', function() {
			expect(a.getSouthEast()).to.eql(new L.LatLng(a.getSouth(), a.getEast()));
		});
	});

	describe('#contains', function () {
		it('returns true if contains latlng point', function () {
			expect(a.contains([16, 20])).to.eql(true);
			expect(L.latLngBounds(a).contains([5, 20])).to.eql(false);
		});

		it('returns true if contains bounds', function () {
			expect(a.contains([[16, 20], [20, 40]])).to.eql(true);
			expect(a.contains([[16, 50], [8, 40]])).to.eql(false);
		});
	});

	describe('#intersects', function () {
		it('returns true if intersects the given bounds', function () {
			expect(a.intersects([[16, 20], [50, 60]])).to.eql(true);
			expect(a.contains([[40, 50], [50, 60]])).to.eql(false);
		});
	});

});
