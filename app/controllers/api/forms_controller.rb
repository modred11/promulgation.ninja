class Api::FormsController < ApplicationController
  def index
    @forms = current_user.forms
  end

  def show
    @form = Form.find(params[:id])
  end

  def create
    if @form = Form.create(form_params)
      render :show
    else
      render json: @form.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @form = Form.find(params[:id])

    if @form.update(form_params)
      render :show
    else
      render json: @form.errors.full_messages
    end
  end

  def destroy
    @form = Form.find(params[:id])

    @form.destroy!

    render :show
  end

  private

  def form_params
    params.require(:form).permit(:title)
  end
end
