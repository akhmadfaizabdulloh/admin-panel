import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  findAll(keyword?: string) {
    if (keyword) {
      return this.categoryRepo.find({
        where: { name: Like(`%${keyword}%`) },
      });
    }
    return this.categoryRepo.find();
  }

  findOne(id: string) {
    return this.categoryRepo.findOneBy({ id });
  }

  create(data: Partial<Category>) {
    const category = this.categoryRepo.create(data);
    return this.categoryRepo.save(category);
  }

  async update(id: string, data: Partial<Category>) {
    await this.categoryRepo.update(id, data);
    return this.findOne(id);
  }

  delete(id: string) {
    return this.categoryRepo.delete(id);
  }
}
