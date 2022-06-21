import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { validationPipe } from "./pipes/validation.pipe";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder() // сборка документа 
        .setTitle('My first documentation.')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .addTag('Dimas-progger')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new validationPipe())

    await app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
}

start()