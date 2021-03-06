# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151015194001) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "fields", force: :cascade do |t|
    t.integer  "form_id"
    t.string   "label"
    t.string   "value"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "ord"
    t.string   "field_type"
    t.text     "options",    default: "{}"
    t.integer  "field_id"
    t.integer  "field_slug"
  end

  add_index "fields", ["field_id"], name: "index_fields_on_field_id", using: :btree
  add_index "fields", ["field_slug"], name: "index_fields_on_field_slug", using: :btree
  add_index "fields", ["form_id"], name: "index_fields_on_form_id", using: :btree

  create_table "forms", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "title",      null: false
    t.integer  "version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "slug"
  end

  add_index "forms", ["slug"], name: "index_forms_on_slug", using: :btree
  add_index "forms", ["user_id"], name: "index_forms_on_user_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.string   "session_token"
    t.integer  "user_id"
    t.string   "useragent"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", using: :btree
  add_index "sessions", ["user_id"], name: "index_sessions_on_user_id", using: :btree

  create_table "submission_fields", force: :cascade do |t|
    t.integer  "field_id"
    t.text     "value"
    t.string   "state"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "submission_id", null: false
  end

  add_index "submission_fields", ["field_id"], name: "index_submission_fields_on_field_id", using: :btree
  add_index "submission_fields", ["submission_id"], name: "index_submission_fields_on_submission_id", using: :btree

  create_table "submissions", force: :cascade do |t|
    t.integer  "form_id"
    t.string   "useragent"
    t.string   "ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "slug"
  end

  add_index "submissions", ["form_id"], name: "index_submissions_on_form_id", using: :btree
  add_index "submissions", ["slug"], name: "index_submissions_on_slug", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.string   "name"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
