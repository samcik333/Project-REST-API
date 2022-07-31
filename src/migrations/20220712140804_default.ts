import { or } from "ajv/dist/compile/codegen";
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('users', (table) => {
    table.increments('id').primary().unique()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
  })
    .createTable('collections', (table) => {
      table.increments('id').primary().unique()
      table.string('name').notNullable().unique()
      table
        .integer('ownerId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
    })
    .createTable('stories', (table) => {
      table.increments('id').primary().unique();
      table.string('title')
      table.integer('time')
      table.string('author')
    })
    .createTable('comments', (table) => {
      table.increments('id').primary().unique();
      table
        .integer('storyId')
        .unsigned()
        .references('id')
        .inTable('stories')
        .onDelete('CASCADE')
        .index()
      table.string('text')
      table.integer('time')
      table
        .integer('parentId')
        .unsigned()
        .references('id')
        .inTable('comments')
        .index()

    })
    .createTable('stories-collects', (table) => {
      table.increments('id').primary().unique()
      table
        .integer('storyId')
        .unsigned()
        .references('id')
        .inTable('stories')
        .onDelete('CASCADE')
        .index();
      table
        .integer('collectionId')
        .unsigned()
        .references('id')
        .inTable('collections')
        .onDelete('CASCADE')
        .index();
    })
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('stories-collects'),
    await knex.schema.dropTableIfExists('comments'),
    await knex.schema.dropTableIfExists('stories'),
    await knex.schema.dropTableIfExists('collections'),
    await knex.schema.dropTableIfExists('users');

}

