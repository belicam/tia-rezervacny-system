namespace ReservationSystemApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deletedHasRefFlag : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Events", "HasReservations");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Events", "HasReservations", c => c.Boolean(nullable: false));
        }
    }
}
