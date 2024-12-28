import mongoose from "mongoose";
import {
  Institutes,
  Boards,
  Mediums,
  ClassCategories,
  Statndards,
  Subjects,
} from "../models/slug.models.js";
const models = {
  institute: Institutes,
  board: Boards,
  medium: Mediums,
  classCategory: ClassCategories,
  standard: Statndards,
  subject: Subjects,
};
async function createSlugs(req, res) {
  try {
    const { slug } = req.params;
    if (!Object.keys(models).includes(slug)) {
      throw new Error("Invalid Model");
    }
    const slugData = req.body;
    const data = await models[slug].create(slugData);
    res.status(200).json({
      status: true,
      data,
      message: "Record created successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, data: null, message: error.message });
  }
}

async function getSlugs(req, res) {
  try {
    const { slug } = req.params;
    const params = req.query;
    if (!Object.keys(models).includes(slug)) {
      throw new Error("Invalid Model");
    }
    const query = [
      {
        $match: {
          ...(params.classCategory && {
            classCategory: new mongoose.Types.ObjectId(params.classCategory),
          }),
        },
      },
      ...(slug === "standard" && [
        {
          $lookup: {
            from: "classcategories",
            localField: "classCategory",
            foreignField: "_id",
            as: "classCategories",
          },
        },
      ]),
      {
        $project: {
          _id: 1,
          name: "$name",
          classCategory: { $first: "$classCategories" },
        },
      },
    ];
    const data = await models[slug].aggregate(query);
    res.status(200).json({
      status: true,
      data,
      message: "Request Completed successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, data: null, message: error.message });
  }
}

export { createSlugs, getSlugs };
