Rails.application.routes.draw do

  #users_controller ﾙｰﾃｨﾝｸﾞ
  root to: 'home#new' 
  #users_controller ﾙｰﾃｨﾝｸﾞ
  resources :users   
  
  get '/login', to: 'session#new'
  post '/login', to: 'session#create'
  delete '/logout', to: 'session#destroy'
  
end
