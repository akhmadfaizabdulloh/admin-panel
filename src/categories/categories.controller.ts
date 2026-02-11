import { Controller, Get, Post, Param, Body, Query, Res, Render } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import type { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  // LIST + SEARCH
  @Get()
  @Render('categories/index')
  async index(@Query('q') q: string) {
    const categories = await this.categoryService.findAll(q);
    return { categories, q };
  }

  // FORM CREATE
  @Get('create')
  @Render('categories/create')
  createForm() {
    return {};
  }

  // STORE
  @Post()
  async store(@Body() body, @Res() res: Response) {
    await this.categoryService.create(body);
    return res.redirect('/categories');
  }

  // DETAIL
  @Get(':id')
  @Render('categories/detail')
  async detail(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return { category };
  }

  // FORM EDIT
  @Get(':id/edit')
  @Render('categories/edit')
  async editForm(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return { category };
  }

  // UPDATE
  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() body,
    @Res() res: Response,
  ) {
    await this.categoryService.update(id, body);
    return res.redirect('/categories');
  }

  // DELETE
  @Post(':id/delete')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.categoryService.delete(id);
    return res.redirect('/categories');
  }
}
