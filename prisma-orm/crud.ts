import { prisma } from "./lib/prisma";


async function run() {
    // const createUser = await prisma.user.create({
    //     data: {
    //         name: "shahidul islam shohid",
    //         email: "shahidul1332@gmail.com" 
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

    // retrive all user====================
    // const users = await prisma.user.findMany({
    // include: {
    //     posts: true,
    //     profile: true
    // }
    //         select: {
    //             id: true,
    //             name: true,
    //             email: true,
    //             posts: true,
    //             profile: true
    //         }
    //     }); 
    //    console.dir(users, { depth: Infinity });

    // update 
    // const updatedUser = await prisma.profile.update({
    //     where : {
    //         userId: 1
    //     },
    //     data: {
    //         bio: "updated data one time",
    //         dateOfBirth: "2026-10-26T09:37:25.289Z"
    //     },
    //     select: {
    //         id: true,
    //         bio: true,
    //         user: {
    //             select: {
    //                 name: true,
    //                 email: true,
    //             }
    //         }, 
    //     }
    // })
    // console.log("updated user", updatedUser)

    // delete 
    // const deleteUser = await prisma.user.delete({
    //     where : {
    //         id: 10
    //     } 
    // })

    // console.log("delete user", deleteUser)

    // get user data by id
    // const userData = await prisma.user.findUnique({
    //     where: {
    //         id: 3
    //     },
    //     include: {
    //         posts: true
    //     }
    // })
    // console.log(userData)

    // upsert====================
    // const upsertUser = await prisma.user.upsert({
    //     where: {
    //         email: "shahidul@gmail.com",
    //     },
    //     update: {
    //         name: "shahidul islam 2"
    //     },
    //     create: {
    //         name: "shahidul islam",
    //         email: "shahidul@gmail.com"
    //     }
    // })
    // console.log("upsertUser", upsertUser)

    const deletePost = await prisma.post.deleteMany({
        where: { authorId: 1}

    })
    console.log("deletePost", deletePost)
}

run()