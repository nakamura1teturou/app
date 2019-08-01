Rails.application.routes.draw do

  #users_controller ﾙｰﾃｨﾝｸﾞ
  root to: 'home#new' 
  #users_controller ﾙｰﾃｨﾝｸﾞ
  resources :users
  
  get '/login', to: 'session#new'
  post '/login', to: 'session#create'
  delete '/logout', to: 'session#destroy'

  #google認証
  get 'auth/:provider/callback', to: 'session#create_g'
  get 'auth/failure', to: redirect('/')

  #多対多のｱｿｼｴｰｼｮﾝ
  resources :messages do
    resource :comments, onry: [:create,:destroy,:new]
  end
  
end
