import { User } from "../models/models.js";

async function registerUser(req, res) {
  try {
    const userData = req.body;
    const user = await User.create(userData);
    res.status(200).json({
      status: true,
      data: user,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, data: null, message: error.message });
  }
}

async function getUsers(req, res) {
  try {
    const queryParams = req.query;
    const query = [
      ...(queryParams.institute
        ? [
            {
              $match: {
                institute: queryParams.institute,
              },
            },
          ]
        : []),
      {
        $project: {
          institute: 1,
          board: "$school.board",
          medium: "$school.medium",
          classCategory: "$school.classCategory.classCategory",
          statndard: "$school.classCategory.statndard",
          subject: "$school.classCategory.subject",
          university: "$college.university",
          degree: "$college.degree",
          examCenter: "$examCenter.examTypes",
        },
      },
    ];
    const user = await User.aggregate(query);
    res.status(200).json({
      status: true,
      data: user,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, data: null, message: error.message });
  }
}

export { registerUser, getUsers };
