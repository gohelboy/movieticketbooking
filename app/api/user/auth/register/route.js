import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import userModal from "../../../../../models/user";
import dbConnection from "../../../../../utils/Connections";
import { registerTemplate } from "../../../../../utils/emailTemplates";
import { sendMail } from "../../../../../utils/helper";
import { failedResponse, InternalServerError, successReponse } from "../../../../../utils/responseHandler";

await dbConnection();

export const POST = async (req, res) => {
    try {
        const { email, password } = await req.json();
        if (!email || !password) return failedResponse("Please provide email and password");

        const userExist = await userModal.findOne({ email });
        if (userExist && userExist.verified) {
            return failedResponse("User already exists with this email address, please login to continue");
        } else if (userExist && !userExist?.verified) {
            const token = JWT.sign({ id: userExist.id, email, verified: false }, process.env.JWT_SECRET);
            const emailPayload = {
                email,
                link: `http://localhost:3000/u/activate?token=${token}`
            }
            await sendMail(email, "Active Your Account", registerTemplate(emailPayload));
            return successReponse("Please check email for verification link");
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new userModal({ email, password: hashedPassword });
        await newUser.save();

        const token = JWT.sign({ email: newUser?.email, id: newUser?.id, verified: false }, process.env.JWT_SECRET);
        const emailPayload = { email, link: `http://localhost:3000/u/activate?token=${token}` }
        await sendMail(email, "Active Your Account", registerTemplate(emailPayload));

        return successReponse("Please check email for verification link");
    } catch (err) {
        return InternalServerError(err);
    }
};


