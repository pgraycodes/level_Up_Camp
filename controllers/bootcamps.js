const BootCamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// desc get all bootCamps
// route  GET/api/v1/bootcamps
//@access  Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootCamps = await BootCamp.find();

  res
    .status(200)
    .json({ success: true, count: bootCamps.length, data: bootCamps });
});

// desc get single bootCamps
// route  GET/api/v1/bootcamps/:id
//@access  Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  //use req.params.id to get parameter on the URL
  const bootcamp = await BootCamp.findById(req.params.id);

  // if format of id is correct but not in DB
  if (!bootcamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// desc create New bootCamp
// route  Post /api/v1/bootcamps/
//@access  Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp
  });
});

// desc update New bootCamp
// route  Put /api/v1/bootcamps/:id
//@access  Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootCamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootCamp });
});

// desc delete bootCamp
// route  delete /api/v1/bootcamps/ :id
//@access  Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findByIdAndDelete(req.params.id);

  if (!bootCamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
