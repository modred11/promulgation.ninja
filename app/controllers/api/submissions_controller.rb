class Api::SubmissionsController < ApplicationController
  def index
    submissions = Submission.find_by(slug: params[:slug])
    # submissions = Submission.find_by(form_id: params[:form_id])
  end

  def create
    draft_form = Form.draft(params[:slug])
    live_form  = Form.live(params[:slug])

    if live_form
      submission = Submission.new(
        slug: live_form.slug,
        form: live_form,
        useragent: request.user_agent,
        ip: request.ip
      )

      build_submission_fields(submission, live_form.fields)

      if submission.save
        render json: { success: true }
      else
        errors = format_errors(submission.submission_fields)

        render json: errors, status: :unprocessable_entity
      end
    else
      render json: "", status: 404
    end
  end

  private

  def submission_params
    params.require(:fields).permit!
  end

  def build_submission_fields(submission, fields)
    submission_params.each do |id, value|
      id    = id.split('_')[1]
      field = fields.find_by(id: id)

      if field
        submission_field = submission.submission_fields.build(
          field: field,
          value: value,
          state: 'alive' # TODO default this elsewhere
        )

        submission_field
      end
    end
  end

  def format_errors(fields)
    errors = {}

    fields.each do |sfield|
      if sfield.errors[:value]
        errors["fields[field_#{sfield.field.id}]"] = sfield.errors[:value]
      end
    end

    errors
  end
end
