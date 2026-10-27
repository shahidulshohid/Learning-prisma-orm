import { prisma } from "./lib/prisma";


async function run() {
    // const createUser = await prisma.user.create({
    //     data: {
    //         name: "shahidul islam shohid",
    //         email: "shahidul132@gmail.com" 
    //     }
    // })

    // console.log("create user", createUser)

    //create post for user id = 1

    // const createPost = await prisma.post.create({
    //     data: {
    //         title: "This is title",
    //         content: "This is content",
    //         authorId: 1
    //     }
    // })

    // console.log("create post", createPost)

    //    const createProfile = await prisma.profile.create({
    //     data: {
    //         bio: "I am a developer",
    //         userId: 7, 
    //     },
    // });
    // console.log("create Profile", createProfile)

    // retrive all user
    const users = await prisma.user.findMany();
    console.log(users)
}

run()