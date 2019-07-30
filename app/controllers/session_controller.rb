class SessionController < ApplicationController
  skip_before_action :login_required

  def new
  end


  def create
    user = User.find_by(name: session_params[:name])

    if user&.authenticate(session_params[:password]) #authenticate = 暗号化されてないパスワードとpassword_digest属性値の一致を検証
      session[:user_id] = user.id
      redirect_to root_path
    else
      render :new
    end
  end

  def destroy
    reset_session
    redirect_to root_path
  end

  private
  def session_params
    params.require(:session).permit(:name, :password)
  end
end
