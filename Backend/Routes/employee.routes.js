const express = require("express");
const auth = require("../Middlewares/auth.middleware");
const Employee = require("../Models/employee.model");
const employeeRoutes = express.Router();

employeeRoutes.use(auth);

/**
 * @swagger
 * components:
 *  schemas:
 *    Employee:
 *      type: object
 *      properties:
 *        userID:
 *          type: string
 *          description: User ID of the employee
 *        name:
 *          type: string
 *          description: Name of the employee
 *        email:
 *          type: string
 *          format: email
 *          description: Email of the employee
 *        mobile:
 *          type: number
 *          description: Mobile number of the employee
 *        designation:
 *          type: string
 *          description: Designation of the employee
 *        gender:
 *          type: string
 *          enum: [male, female, other]
 *          description: Gender of the employee
 *        course:
 *          type: string
 *          description: Course of the employee
 *        createdate:
 *          type: string
 *          format: date-time
 *          description: Date when the employee record was created
 *        image:
 *          type: string
 *          description: Image URL of the employee
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error message
 */

//     const val = sort;
//     console.log({ val, order, search });
//     if (search) {
//       if (order == "asc" && sort == "name") {
//         const employees = await Employee.find({ userID })
//           .find({ name: { $regex: search, $options: "i" } })
//           .sort({ name: 1 });
//         res.status(200).json({ employees });
//       } else if (order == "desc" && sort == "name") {
//         const employees = await Employee.find({ userID })
//           .find({ name: { $regex: search, $options: "i" } })
//           .sort({ name: -1 });
//         res.status(200).json({ employees });
//       } else if (order == "asc" && sort == "email") {
//         const employees = await Employee.find({ userID })
//           .find({ name: { $regex: search, $options: "i" } })
//           .sort({ email: 1 });
//         res.status(200).json({ employees });
//       } else if (order == "desc" && sort == "email") {
//         const employees = await Employee.find({ userID })
//           .find({ name: { $regex: search, $options: "i" } })
//           .sort({ email: -1 });
//         res.status(200).json({ employees });
//       } else if (order == "asc" && sort == "_id") {
//         const employees = await Employee.find({ userID })
//           .find({ name: { $regex: search, $options: "i" } })
//           .sort({ _id: 1 });
//         res.status(200).json({ employees });
//       } else if (order == "desc" && sort == "_id") {
//         const employees = await Employee.find({ userID })
//           .find({ name: { $regex: search, $options: "i" } })
//           .sort({ _id: -1 });
//         res.status(200).json({ employees });
//       } else if (order == "asc" && sort == "createdate") {
//         const employees = await Employee.find({ userID })
//           .find({ name: { $regex: search, $options: "i" } })
//           .sort({ createdate: 1 });
//         res.status(200).json({ employees });
//       } else if (order == "desc" && sort == "createdate") {
//         const employees = await Employee.find({ userID })
//           .find({ name: { $regex: search, $options: "i" } })
//           .sort({ createdate: -1 });
//         res.status(200).json({ employees });
//       }
//       const employees = await Employee.find({ userID }).find({
//         name: { $regex: search, $options: "i" },
//       });
//       res.status(200).json({ employees });
//     }
//     if (order == "asc" && sort == "name") {
//       const employees = await Employee.find({ userID }).sort({ name: 1 });
//       res.status(200).json({ employees });
//     } else if (order == "desc" && sort == "name") {
//       const employees = await Employee.find({ userID }).sort({ name: -1 });
//       res.status(200).json({ employees });
//     } else if (order == "asc" && sort == "email") {
//       const employees = await Employee.find({ userID }).sort({ email: 1 });
//       res.status(200).json({ employees });
//     } else if (order == "desc" && sort == "email") {
//       const employees = await Employee.find({ userID }).sort({ email: -1 });
//       res.status(200).json({ employees });
//     } else if (order == "asc" && sort == "_id") {
//       const employees = await Employee.find({ userID }).sort({ _id: 1 });
//       res.status(200).json({ employees });
//     } else if (order == "desc" && sort == "_id") {
//       const employees = await Employee.find({ userID }).sort({ _id: -1 });
//       res.status(200).json({ employees });
//     } else if (order == "asc" && sort == "createdate") {
//       const employees = await Employee.find({ userID }).sort({ createdate: 1 });
//       res.status(200).json({ employees });
//     } else if (order == "desc" && sort == "createdate") {
//       const employees = await Employee.find({ userID }).sort({
//         createdate: -1,
//       });
//       res.status(200).json({ employees });
//     }
//     const employees = await Employee.find({ userID });
//     res.status(200).json({ employees });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Retrieve employees based on query parameters
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: User ID for filtering employees
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., name, email)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc for ascending, desc for descending)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search string to filter employees by name
 *     responses:
 *       200:
 *         description: List of employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

employeeRoutes.post("/", async (req, res) => {
  try {
    const userID = req.body.userID;
    const { sort, order, search } = req.query;

    let query = { userID };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    let sortField = {};
    if (sort) {
      sortField[sort] = order === "asc" ? 1 : -1;
    }

    const employees = await Employee.find(query).sort(sortField);

    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /employees/add:
 *   post:
 *     summary: Add a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the employee
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the employee
 *               mobile:
 *                 type: number
 *                 description: Mobile number of the employee
 *               designation:
 *                 type: string
 *                 description: Designation of the employee
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: Gender of the employee
 *               course:
 *                 type: string
 *                 description: Course of the employee
 *     responses:
 *       200:
 *         description: Employee added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

employeeRoutes.post("/add", async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, userID } =
      req.body;

    const employee = new Employee({
      userID,
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    });

    await employee
      .save()
      .then(() => {
        res.status(200).json({ message: "Employee added successfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /employees/delete/{_id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID to delete
 *       - in: body
 *         name: userID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userID:
 *               type: string
 *               description: User ID for authorization
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

employeeRoutes.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { userID} = req.body;
    await Employee.deleteOne({ _id, userID });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /employees/update/{_id}:
 *   patch:
 *     summary: Update an employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the employee
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email of the employee
 *               mobile:
 *                 type: number
 *                 description: New mobile number of the employee
 *               designation:
 *                 type: string
 *                 description: New designation of the employee
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: New gender of the employee
 *               course:
 *                 type: string
 *                 description: New course of the employee
 *               userID:
 *                 type: string
 *                 description: User ID for authorization
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

employeeRoutes.patch("/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, email, mobile, designation, gender, course, userID } =
      req.body;
    await Employee.updateOne(
      { _id, userID },
      {
        name,
        email,
        mobile,
        designation,
        gender,
        course,
      }
    );
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = employeeRoutes;
