class AddTrue < ActiveRecord::Migration[5.2]
  def up
    change_column :active_storage_blobs, :key, :string, null: false
    change_column :active_storage_blobs, :filename, :string, null: false
    change_column :active_storage_blobs, :byte_size, :string, null: false
    change_column :active_storage_blobs, :checksum, :string, null: false
    change_column :active_storage_blobs, :created_at, :string, null: false
  end

  def down
    change_column :active_storage_blobs, :key, :string, null: false
    change_column :active_storage_blobs, :filename, :string, null: false
    change_column :active_storage_blobs, :byte_size, :string, null: false
    change_column :active_storage_blobs, :checksum, :string, null: false
    change_column :active_storage_blobs, :created_at, :string, null: false
  end
end
