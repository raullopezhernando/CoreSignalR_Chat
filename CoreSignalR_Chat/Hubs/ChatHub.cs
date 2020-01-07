using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


namespace CoreSignalR_Chat.Hubs
{
    public class ChatHub : Microsoft.AspNetCore.SignalR.Hub
    {
        public async Task BroadcastMessageGroup(Person person) 

        {
            // Notify all clients that belong to the group
            await Clients.Group(person.Group).SendAsync(person.Group, person.Name, person.Message);
        }


        public async Task AddToGroupAsync(string groupName) 
        {
            //Add a customer to a specific group
           await  Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            //Send to all customers of that group
            await Clients.Group(groupName).SendAsync("displayTextConnect", $"{Context.ConnectionId} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroupAsync(string groupName) 
        {
            //Notifiy that someone has been deleted
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("displayTextConnect", $"{Context.ConnectionId} has left the group {groupName}.");

        }




    }
}
