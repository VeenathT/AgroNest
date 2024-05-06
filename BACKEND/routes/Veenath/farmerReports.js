const router = require("express").Router();
const FarmerReport = require("../../models/Veenath/farmerReport");


router.post("/", async (req, res) => {
  try {
    const { name, topic, description, priority, category, area, status } = req.body;
    const newReport = new FarmerReport({
      name,
      topic,
      description,
      priority,
      category,
      area,
      status,
    });
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const reports = await FarmerReport.find();
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const report = await FarmerReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { name, topic, description, priority, category, area, status } = req.body;
    const updatedReport = await FarmerReport.findByIdAndUpdate(
      req.params.id,
      { name, topic, description, priority, category, area, status },
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(updatedReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedReport = await FarmerReport.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
