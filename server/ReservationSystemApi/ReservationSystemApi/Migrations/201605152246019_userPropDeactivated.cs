namespace ReservationSystemApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userPropDeactivated : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Deactivated", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Deactivated");
        }
    }
}
