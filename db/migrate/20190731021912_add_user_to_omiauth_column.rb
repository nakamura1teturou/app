class AddUserToOmiauthColumn < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :provider, :string
    add_column :users, :uid, :string
    add_column :users, :image, :string
    add_column :users, :oauth_token, :string
    add_column :users, :oauth_expires_at, :datetime
  end

  def down
    remove_column :users, :provider, :string
    remove_column :users, :email, :string
    remove_column :users, :uid, :string
    remove_column :users, :image, :string
    remove_column :users, :oauth_token, :string
    remove_column :users, :oauth_expires_at, :datetime
  end
end
