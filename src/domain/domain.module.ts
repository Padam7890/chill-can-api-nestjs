import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { HeroSectionService } from "./main-hero-section/hero-section.service";
import { HeroSectionModule } from "./main-hero-section/hero-section.module";
import { SecondHeroSectionModule } from "./second-hero-section/second-hero-section.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { SkydiveModule } from './skydive/skydive.module';
import { FlavorModule } from './flavor/flavor.module';


@Module({
  imports: [HeroSectionModule, SecondHeroSectionModule, UserModule, AuthModule, SkydiveModule, FlavorModule],
  controllers: [],
  providers: [],
})

export class DomainModule{}