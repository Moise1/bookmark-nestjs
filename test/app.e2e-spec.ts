import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Test} from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaOpsService } from '../src/prisma-ops/prisma-ops.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto/editUser.dto';


const testUrl = 'http://localhost:3005';
describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
     
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
    await app.init();
    await app.listen(3005);
    const prisma = app.get(PrismaOpsService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    app.close();
  });

  // User/auth tests

  describe('Auth', () =>{

    describe('Sign Up', () =>{
      it('Should fail wihout email', () =>{
        // const body: AuthDto = {
        //   email: 'mosha@gmail.com',
        //   password: '1234'
        // }

        return pactum
        .spec()
        .post(`${testUrl}/auth/register`)
        .withBody({password: '1234'})
        .expectStatus(400)
      });

      it('Should sign Up', () =>{
        const body: AuthDto = {
          email: 'mosha@gmail.com',
          password: '1234'
        }
        return pactum
        .spec()
        .post(`${testUrl}/auth/register`)
        .withBody(body)
        .expectStatus(201)
      });

    });


    describe('Log In', () => {

      it('Should login a user', () =>{
        const body: AuthDto = {
          email: 'mosha@gmail.com',
          password: '1234'
        }
        return pactum
        .spec()
        .post(`${testUrl}/auth/login`)
        .withBody(body)
        .expectStatus(200)
        .stores('user_token', 'token')
      });
    });


  });

  describe('Users', () => {

    describe('Get Me/Current user', () =>{
      it('Should get current user', () => {
        return  pactum
        .spec()
        .get(`${testUrl}/users/me`)
        .withHeaders({
          'Authorization': 'Bearer $S{user_token}'
        })
        .expectStatus(200)
      })
    });


    describe('Edit user', () =>{

      it('Should edit user', () => {
        const body: EditUserDto = {
          firstName: 'moshes',
          email: 'mosheo@gmail.com'
        };
        return  pactum
        .spec()
        .patch(`${testUrl}/users/edit`)
        .withHeaders({
          'Authorization': 'Bearer $S{user_token}'
        })
        .withBody(body)
        .expectStatus(200)
        .expectBodyContains(body.email)
      })

    });

  });

  //  Bookmarks tests

  describe('Bookmarks', () => {

    describe('Get bookmarks', () =>{
      it('Should get all bookmarks', () => {
        return  pactum
        .spec()
        .get(`${testUrl}/bookmarks`)
        .withHeaders({
          'Authorization': 'Bearer $S{user_token}'
        })
        .expectStatus(200)
        .inspect()
      })
    });

    describe('Create bookmark', () =>{});


    describe('Get by id', () =>{});


    describe('Edit bookmark by id', () =>{});


    describe('Delete bookmark by id', () =>{});

  });

})
