const express = require("express");
const { getConnection } = require("../DB/connection");

const router = express.Router();

router.post("/child", async (req, res) => {
  const connection = await getConnection();
  console.log("Received data:", req.body);
  // Insert statement with autoCommit option
  const resultReg = await connection.execute(
    `INSERT INTO CHILD (C_ID, NAME, DOB, CONTACT_NO, EMAIL, P_EMAIL, CITY, STREET, POSTAL_CODE)
             VALUES (:C_ID, :NAME, TO_DATE(:DOB, 'YYYY-MM-DD'), :CONTACT_NO, :EMAIL, :P_EMAIL, :CITY, :STREET, :POSTAL_CODE)`,
    {
      C_ID: req.body.C_ID,
      NAME: req.body.NAME,
      DOB: req.body.DOB,
      CONTACT_NO: req.body.CONTACT_NO,
      EMAIL: req.body.EMAIL,
      P_EMAIL: req.body.P_EMAIL,
      CITY: req.body.CITY,
      STREET: req.body.STREET,
      POSTAL_CODE: req.body.POSTAL_CODE,
    },
    { autoCommit: true }
  );
  const resultLog = await connection.execute(
    `INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
             VALUES (:EMAIL, :PASSWORD, 'child')`,
    {
      EMAIL: req.body.EMAIL,
      PASSWORD: req.body.PASSWORD,
    },
    { autoCommit: true }
  );
  res
    .status(201)
    .send({ message: "Child registered successfully!", resultReg });
  console.log("Request processed");
});

router.post("/parent", async (req, res) => {
  const connection = await getConnection();
  console.log("Received data:", req.body);
  const resultReg = await connection.execute(
    `INSERT INTO PARENT (P_ID, NAME, DOB, CONTACT_NO, EMAIL, CITY, STREET, POSTAL_CODE)
                 VALUES (:P_ID, :NAME, TO_DATE(:DOB, 'YYYY-MM-DD'), :CONTACT_NO, :EMAIL, :CITY, :STREET, :POSTAL_CODE)`,
    {
      P_ID: req.body.P_ID,
      NAME: req.body.NAME,
      DOB: req.body.DOB,
      CONTACT_NO: req.body.CONTACT_NO,
      EMAIL: req.body.EMAIL,
      CITY: req.body.CITY,
      STREET: req.body.STREET,
      POSTAL_CODE: req.body.POSTAL_CODE,
    },
    { autoCommit: true }
  );
  const resultLog = await connection.execute(
    `INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
                 VALUES (:EMAIL, :PASSWORD, 'parent')`,
    {
      EMAIL: req.body.EMAIL,
      PASSWORD: req.body.PASSWORD,
    },
    { autoCommit: true }
  );
  res
    .status(201)
    .send({ message: "Parent registered successfully!", resultReg });
  console.log("Request processed");
});

router.post("/doctor", async (req, res) => {
  const connection = await getConnection();
  console.log("Received data:", req.body);
  const resultReg = await connection.execute(
    `INSERT INTO HEALTH_PROFESSIONAL (H_ID, NAME, CONTACT_NO, EMAIL, DEGREE , FIELD_OF_SPEC, CITY, STREET, POSTAL_CODE)
                 VALUES (:H_ID, :NAME, :CONTACT_NO, :EMAIL, :DEGREE, :FIELD_OF_SPEC, :CITY, :STREET, :POSTAL_CODE)`,
    {
      H_ID: req.body.H_ID,
      NAME: req.body.NAME,
      CONTACT_NO: req.body.CONTACT_NO,
      EMAIL: req.body.EMAIL,
      DEGREE: req.body.DEGREE,
      FIELD_OF_SPEC: req.body.FIELD_OF_SPEC,
      CITY: req.body.CITY,
      STREET: req.body.STREET,
      POSTAL_CODE: req.body.POSTAL_CODE,
    },
    { autoCommit: true }
  );
  const resultLog = await connection.execute(
    `INSERT INTO LOG_IN (EMAIL, PASSWORD, TYPE)
                 VALUES (:EMAIL, :PASSWORD, 'doctor')`,
    {
      EMAIL: req.body.EMAIL,
      PASSWORD: req.body.PASSWORD,
    },
    { autoCommit: true }
  );
  res
    .status(201)
    .send({ message: "Doctor registered successfully!", resultReg });
  console.log("Request processed");
});

module.exports = router;
