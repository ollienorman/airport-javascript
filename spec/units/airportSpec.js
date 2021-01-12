'use strict';

describe('Airport', function(){
  var airport;
  var plane;
  beforeEach(function(){
    airport = new Airport();
    plane = jasmine.createSpy('plane',['land']);
  });
  it('has no planes by default', function(){
    expect(airport.planes()).toEqual([]);
  });
  it('can clear planes for landing', function(){
    spyOn(airport._weather,'isStormy').and.returnValue(false);
    airport.clearForLanding(plane);
    expect(airport.planes()).toEqual([plane]);
  });
  it('can clear planes for takeoff', function(){
    spyOn(airport._weather,'isStormy').and.returnValue(false);
    airport.clearForLanding(plane);
    airport.clearForTakeOff(plane);
    expect(airport.planes()).toEqual([]);
  });
});

describe('under stormy conditions', function(){
  var airport;
  var plane;
  beforeEach(function(){
    airport = new Airport();
    plane = jasmine.createSpy('plane',['land']);
  });
  it('does not clear planes for takeoff', function(){
    spyOn(airport._weather,'isStormy').and.returnValue(true);
    expect(function(){ airport.clearForTakeOff(plane); }).toThrowError('cannot takeoff during storm');
  });
  it('does not clear planes for landing', function(){
    spyOn(airport._weather,'isStormy').and.returnValue(true);
    expect(function(){ airport.clearForLanding(plane); }).toThrowError('cannot land during storm');
  });
});
