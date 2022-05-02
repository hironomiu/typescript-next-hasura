import React from 'react'
import { useReactiveVar, useMutation } from '@apollo/client'
import { isUpdateModalOnVar, updateUserVar } from '../../cache'
import { UpdateUserMutation } from '../../types/generated/graphql'
import { UPDATE_USER } from '../../queries/queries'

// TODO: デザイン
const UpdateModal = () => {
  const updateUser = useReactiveVar(updateUserVar)

  const [update_users_by_pk, update] = useMutation<UpdateUserMutation>(
    UPDATE_USER,
    {
      update(cache, { data: { update_users_by_pk } }) {
        cache.modify({
          fields: {
            users(existingUsers, { readField }) {
              return existingUsers.filter(
                (user) => update_users_by_pk.id !== readField('id', user)
              )
            },
          },
        })
      },
    }
  )

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await update_users_by_pk({
      variables: {
        id: updateUser.id,
        name: updateUser.name,
      },
    })
    isUpdateModalOnVar(false)
  }
  const handleCloseClick = () => {
    isUpdateModalOnVar(false)
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserVar({ ...updateUser, name: e.target.value })
  }
  return (
    <>
      <div
        onClick={handleCloseClick}
        className="absolute inset-0 bg-black opacity-50"
      />
      <div className="absolute bottom-[10%] left-1/3 px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div
          onClick={handleCloseClick}
          className="bg-black opacity-0 w-full h-full absolute z-10 inset-0"
        />
        <div className="bg-blue-100 rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-start w-72 h-24">
            <div className="mt-4 md:mt-0 md:mx-6 text-center md:text-left w-screen">
              <p className="font-bold text-2xl text-blue-900">Update User</p>
            </div>
          </div>
          <div>
            <input
              type="text"
              value={updateUser.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              onClick={handleClick}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 disabled:bg-white disabled:text-gray-200 hover:bg-blue-400 bg-blue-200 text-blue-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              data-testid="card-modal-create-and-update-button"
            >
              Update
            </button>
            <button
              onClick={handleCloseClick}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 hover:bg-gray-400 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
              data-testid="card-modal-close-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateModal
