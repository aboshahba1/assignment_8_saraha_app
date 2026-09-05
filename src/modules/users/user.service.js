import userModel from "../../DB/models/user.models.js"

export const getUsers = async(req, res, next)=>{
    try {
        const users =await  userModel.findALl();
        res.status(200).json({message:"done",users})
    } catch (error) {
         res.status(500).json({message:error.message, error})
    }
    
}
// part 2 A question 1 that APi create a new user  using build and save 
export const signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await userModel.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        const user = userModel.build({
            name,
            email,
            password,
            role
        });

        await user.save();

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
// part 2 A question 2 that API create or ubdate basen on pK and use skip validation option
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const user = await userModel.findByPk(id);

        if (user) {
            await user.update(
                {
                    name,
                    email,
                    password,
                    role
                },
                {
                    validate: false
                }
            );

            return res.status(200).json({
                message: "User updated successfully",
                user
            });
        }

        const newUser = await userModel.create(
            {
                name,
                email,
                password,
                role
            },
            {
                validate: false
            }
        );

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
// part 2 A question 3 that get user by email
export const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.query;

        const user = await userModel.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User found",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// part 2 A question 4 that get user by pK and excluding the role field from the response
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userModel.findByPk(id, {
            attributes: {
                exclude: ["role"]
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User found",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};