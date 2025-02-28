import express from "express";
import {createStaff, deleteStaff, getStaffs, updateStaff} from "../controller/staff-controller";
import {StaffModel} from "../model/staff-model";
import authorizeRole from "../middleware/user-authorize";

const router = express.Router();
router.use(express.json());

router.get('/get', async (req, res) => {
    try {
        const staffs = await getStaffs()
        res.status(200).json(staffs);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Getting Staff")
    }
});

router.post('/post', authorizeRole("MANAGER", "SUPERVISOR"), async (req, res) => {
    try {
        const { name, role, shiftSchedule, gender, email, mobile, warehouseId } = req.body;
        const staffModel = new StaffModel(
            "",
            name,
            role,
            shiftSchedule,
            gender,
            email,
            mobile,
            warehouseId
        );

        const addedStaff = await createStaff(staffModel);
        if (addedStaff) {
            res.status(201).json(addedStaff);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Create Staff")
    }
});

// @ts-ignore
router.patch('/patch/:id', authorizeRole("MANAGER", "SUPERVISOR"), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, shiftSchedule, gender, email, mobile, warehouseId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Staff ID is required" });
        }

        const staffData = new StaffModel(
            id,
            name,
            role,
            shiftSchedule,
            gender,
            email,
            mobile,
            warehouseId
        );

        const updatedStaff = await updateStaff(id, staffData);
        if (updatedStaff) {
            res.status(200).json(updatedStaff);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed Update Staff")
    }
});

// @ts-ignore
router.delete('/delete/:id', authorizeRole("MANAGER", "SUPERVISOR"), async(req, res) => {
    const staffId: string = req.params.id;

    try {
        if (!staffId) {
            return res.status(400).json({ message: "Staff ID is required" });
        }
        await deleteStaff(staffId);
        res.status(204).json("Staff Member Delete Successful");
    } catch (error) {
        console.log(error);
    }
})

export default router;